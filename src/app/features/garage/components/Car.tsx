import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";
import { animateCar, getCarDistance } from "../../../../utils/garageUtils";
import { useAppDispatch, useGarageContext } from "../../../hooks";
import { store } from "../../../store";
import {
  useDriveEngineMutation,
  useLazyGetWinnerQuery,
  usePostWinnerMutation,
  usePutWinnerMutation,
  useStartEngineMutation,
  useStopEngineMutation,
} from "../garageAPI";
import { setAnimationState, setHasWinner } from "../garageSlice";
import { AnimationState, CarAnimation, PageCar } from "../types/garageTypes";
import CarCRUD from "./CarCRUD";

function TheCar({ car, index }: { car: PageCar; index: number }) {
  const dispatch = useAppDispatch();
  const carRef = useRef<HTMLDivElement>(null);
  const { carsAnimationStates, notificationApi } = useGarageContext();
  const [startEngine, { isLoading: startLoading }] = useStartEngineMutation();
  const [driveEngine] = useDriveEngineMutation();
  const [stopEngine, { isLoading: stopLoading }] = useStopEngineMutation();
  const [postWinner] = usePostWinnerMutation();
  const [putWinner] = usePutWinnerMutation();
  const [getWinner] = useLazyGetWinnerQuery();

  const dispatchAnimationState = (value: CarAnimation) => {
    dispatch(setAnimationState({ id: car.id, value }));
  };

  const recordWinner = (animDur: number) => {
    const animDurInSec = Math.round((animDur / 1000) * 10) / 10;
    notificationApi.success({
      message: (
        <>
          <strong>{car.name} </strong>-<strong> {animDurInSec} s</strong>
        </>
      ),
    });
    dispatch(setHasWinner(true));
    getWinner(car.id)
      .unwrap()
      .then((winner) => {
        putWinner({ ...winner, wins: winner.wins + 1 });
      })
      .catch((err: FetchBaseQueryError) => {
        if (err.status === 404) {
          postWinner({ id: car.id, time: animDurInSec, wins: 1 });
        }
      });
  };

  const startMoving = async () => {
    const { distance, velocity } = await startEngine(car.id).unwrap();
    const animDur = distance / velocity;
    const finDis = getCarDistance(carRef.current!);
    dispatchAnimationState({ state: AnimationState.Waiting });

    carsAnimationStates[index].record = animateCar(animDur, finDis, car.id);
    let start = performance.now();

    const driveRequest = driveEngine(car.id);
    carsAnimationStates[index].request = driveRequest;

    try {
      await driveRequest.unwrap();
      const { isRaceStarted, hasWinner } = store.getState().garage;
      if (isRaceStarted && !hasWinner) {
        recordWinner(animDur);
      }
      dispatchAnimationState({ translateX: finDis });
      delete carsAnimationStates[index].request;
    } catch (error: any) {
      if (error.name !== "AbortError") {
        // crashed
        const translateX = (performance.now() - start) * (finDis / animDur);
        dispatchAnimationState({ translateX });
        window.cancelAnimationFrame(carsAnimationStates[index].record!.id);
        delete carsAnimationStates[index].request;
      }
    }
  };

  const stopMoving = async () => {
    const { record, request } = carsAnimationStates[index];
    if (request) {
      // driving on
      window.cancelAnimationFrame(record!.id);
      request!.abort();
      delete carsAnimationStates[index].request;
      dispatchAnimationState({ translateX: 0 });
      stopEngine(car.id).then(() => {
        dispatchAnimationState({
          state: AnimationState.Initial,
          translateX: 0,
        });
      });
    } else {
      dispatchAnimationState({
        state: AnimationState.Initial,
        translateX: 0,
      });
    }
  };

  useEffect(() => {
    switch (car.animation.state) {
      case AnimationState.Started:
        startMoving();
        break;
      case AnimationState.Stopped:
        stopMoving();
        break;
    }
  }, [car.animation.state]);

  return (
    <CarCRUD
      carRef={carRef}
      startLoading={startLoading}
      stopLoading={stopLoading}
      car={car}
    />
  );
}

export default TheCar;
