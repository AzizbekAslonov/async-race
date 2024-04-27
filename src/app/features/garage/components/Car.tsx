import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, List, Space, Typography } from "antd";
import { CSSProperties, useEffect, useRef } from "react";
import { animateCar, getCarImage } from "../../../../utils/utils";
import { useAppDispatch, useGarageContext } from "../../../hooks";
import {
  useDeleteCarMutation,
  useDeleteWinnerMutation,
  useDriveEngineMutation,
  useLazyGetWinnerQuery,
  usePostWinnerMutation,
  usePutWinnerMutation,
  useStartEngineMutation,
  useStopEngineMutation,
} from "../garageAPI";
import {
  filterCars,
  openModal,
  setAnimationState,
  setPageCars,
  setWinner,
} from "../garageSlice";
import { AnimationState, Car, CarAnimation } from "../garageTypes";
import { store } from "../../../store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function TheCar({ car, index }: { car: Car; index: number }) {
  const dispatch = useAppDispatch();
  const carRef = useRef<HTMLDivElement>(null);
  const { carsAnimationStates, notificationApi } = useGarageContext();
  const [startEngine, { isLoading: startLoading }] = useStartEngineMutation();
  const [driveEngine] = useDriveEngineMutation();
  const [stopEngine, { isLoading: stopLoading }] = useStopEngineMutation();
  const [deleteCar, { isLoading: isDelLoading }] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();
  const [postWinner] = usePostWinnerMutation();
  const [putWinner] = usePutWinnerMutation();
  const [getWinner] = useLazyGetWinnerQuery();

  const dispatchAnimationState = (value: CarAnimation) => {
    dispatch(setAnimationState({ id: car.id, value }));
  };

  const removeCar = () => {
    deleteWinner(car.id);
    deleteCar(car.id)
      .unwrap()
      .then(() => {
        dispatch(filterCars(car.id));
        dispatch(setPageCars());
      });
  };

  const startHandler = () => {
    dispatchAnimationState({
      state: AnimationState.Started,
      translateX: null,
    });
  };

  const stopHandler = () => {
    if (carRef.current) {
      dispatchAnimationState({ state: AnimationState.Stopped });
    }
  };

  useEffect(() => {
    switch (car.animation.state) {
      case AnimationState.Started:
        const parent = carRef.current!.closest(".ant-list-item") as HTMLElement;
        const { offsetWidth, offsetLeft } = carRef.current!;
        const finishDistance = parent.offsetWidth - offsetWidth - offsetLeft;
        startEngine(car.id)
          .unwrap()
          .then(({ distance, velocity }) => {
            const animDuration = distance / velocity;
            dispatchAnimationState({ state: AnimationState.Waiting });

            // animRef.current = animateCar(
            carsAnimationStates[index].record = animateCar(
              animDuration,
              finishDistance,
              car.id
            );
            let startTime = performance.now();

            const driveRequest = driveEngine(car.id);
            carsAnimationStates[index].request = driveRequest;
            driveRequest
              .unwrap()
              .then(() => {
                // finish
                if (
                  store.getState().garage.isRaceStarted &&
                  !store.getState().garage.winner
                ) {
                  const animDurationInSec =
                    Math.round((animDuration / 1000) * 10) / 10;
                  notificationApi.success({
                    message: (
                      <>
                        <strong>{car.name} </strong>-
                        <strong> {animDurationInSec} s</strong>
                      </>
                    ),
                  });
                  dispatch(setWinner(car));
                  getWinner(car.id)
                    .unwrap()
                    .then((winner) => {
                      putWinner({ ...winner, wins: winner.wins + 1 });
                    })
                    .catch((err: FetchBaseQueryError) => {
                      if (err.status === 404) {
                        postWinner({
                          id: car.id,
                          time: animDurationInSec,
                          wins: 1,
                        });
                      }
                    });
                }
                dispatchAnimationState({ translateX: finishDistance });
                delete carsAnimationStates[index].request;
              })
              .catch((err: Error) => {
                if (err.name !== "AbortError") {
                  // crashed
                  dispatchAnimationState({
                    translateX:
                      (performance.now() - startTime) *
                      (finishDistance / (distance / velocity)),
                  });
                  window.cancelAnimationFrame(
                    carsAnimationStates[index].record!.id
                  );
                  delete carsAnimationStates[index].request;
                }
              });
          });
        break;
      case AnimationState.Stopped:
        if (carsAnimationStates[index].request) {
          // driving on
          window.cancelAnimationFrame(carsAnimationStates[index].record!.id);
          carsAnimationStates[index].request!.abort();
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

        break;
    }
  }, [car.animation.state]);

  const initialCarPosition: CSSProperties =
    car.animation.translateX !== null && car.animation.translateX !== undefined
      ? { translate: `${car.animation.translateX}px` }
      : {};

  return (
    <List.Item>
      <Flex align="center" gap="small">
        {/* start/stop */}
        <Flex gap="middle" justify="center" vertical>
          <Button
            disabled={
              car.animation.state === AnimationState.Waiting ||
              startLoading ||
              stopLoading
            }
            onClick={startHandler}
            type="primary"
            size="small"
          >
            Start
          </Button>
          <Button
            disabled={
              car.animation.state === AnimationState.Initial ||
              stopLoading ||
              startLoading
            }
            onClick={stopHandler}
            size="small"
          >
            Stop
          </Button>
        </Flex>
        {/* edit/delete */}
        <div>
          <Flex align="start" vertical>
            <Typography.Paragraph className="m-0">
              {car.name}
            </Typography.Paragraph>
            <div
              id={`car-${car.id}`}
              style={initialCarPosition}
              ref={carRef}
              className="car-image"
            >
              {getCarImage(car.color)}
            </div>
          </Flex>
          <Space>
            <Button
              onClick={() => dispatch(openModal(car))}
              type="text"
              icon={<EditOutlined />}
            ></Button>
            <Button
              onClick={removeCar}
              type="text"
              disabled={isDelLoading}
              icon={<DeleteOutlined />}
            ></Button>
          </Space>
        </div>
      </Flex>
    </List.Item>
  );
}

export default TheCar;
