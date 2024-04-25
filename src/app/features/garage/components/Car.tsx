import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, List, Space, Typography } from "antd";
import { CSSProperties, useEffect, useRef } from "react";
import { animateCar, getCarImage } from "../../../../utils/utils";
import { useAppDispatch, useGarageContext } from "../../../hooks";
import {
  useDeleteCarMutation,
  useDriveEngineMutation,
  useStartEngineMutation,
  useStopEngineMutation,
} from "../garageAPI";
import { filterCars, openModal, setAnimationState } from "../garageSlice";
import { AnimationState, Car, CarAnimation } from "../garageTypes";

function TheCar({ car, index }: { car: Car; index: number }) {
  const dispatch = useAppDispatch();
  const carRef = useRef<HTMLDivElement>(null);
  const { carsAnimationStates } = useGarageContext();
  const [startEngine, { isLoading: startLoading }] = useStartEngineMutation();
  const [driveEngine, { isLoading: driveLoading }] = useDriveEngineMutation();
  const [stopEngine, { isLoading: stopLoading }] = useStopEngineMutation();
  const [deleteCar, { isLoading: isDelLoading }] = useDeleteCarMutation();

  const dispatchAnimationState = (value: CarAnimation) => {
    dispatch(setAnimationState({ id: car.id, value }));
  };

  const removeCar = () => {
    deleteCar(car.id)
      .unwrap()
      .then(() => {
        dispatch(filterCars(car.id));
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
            let startTime = performance.now();
            dispatchAnimationState({ state: AnimationState.Waiting });

            // animRef.current = animateCar(
            carsAnimationStates[index].record = animateCar(
              distance / velocity,
              finishDistance,
              car.id
            );

            const driveRequest = driveEngine(car.id);
            carsAnimationStates[index].request = driveRequest;
            driveRequest
              .unwrap()
              .then(() => {
                dispatchAnimationState({ translateX: finishDistance });
                delete carsAnimationStates[index].request;
              })
              .catch((err: Error) => {
                if (err.name !== "AbortError") {
                  // crashed
                  window.cancelAnimationFrame(
                    carsAnimationStates[index].record!.id
                  );
                  dispatchAnimationState({
                    translateX:
                      (performance.now() - startTime) *
                      (finishDistance / (distance / velocity)),
                  });
                  delete carsAnimationStates[index].request;
                }
              });
          });
        break;
      case AnimationState.Stopped:
        if (carsAnimationStates[index].request) {
          // driving case
          window.cancelAnimationFrame(carsAnimationStates[index].record!.id);
          carsAnimationStates[index].request!.abort();
          delete carsAnimationStates[index].request;
          stopEngine(car.id);
        }
        dispatchAnimationState({
          state: AnimationState.Initial,
          translateX: 0,
        });

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
              car.animation.state === AnimationState.Started ||
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
              car.animation.state === AnimationState.Initial || startLoading
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
