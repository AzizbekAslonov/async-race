import React, { CSSProperties } from "react";
import { AnimationState, CarAnimation, PageCar } from "../types/garageTypes";
import { useDeleteCarMutation } from "../garageAPI";
import { useDeleteWinnerMutation } from "../../winners/winnersAPI";
import { useAppDispatch } from "../../../hooks";
import {
  openModal,
  removeCar,
  setAnimationState,
  updatePageCars,
} from "../garageSlice";
import { Button, Flex, List, Space, Typography } from "antd";
import { getCarImage } from "../../../../utils/garageUtils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type CarCRUDProps = {
  car: PageCar;
  carRef: React.RefObject<HTMLDivElement>;
  startLoading: boolean;
  stopLoading: boolean;
};

function CarCRUD({ car, carRef, startLoading, stopLoading }: CarCRUDProps) {
  const dispatch = useAppDispatch();
  const [deleteCar, { isLoading: isDelLoading }] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();

  const dispatchAnimationState = (value: CarAnimation) => {
    dispatch(setAnimationState({ id: car.id, value }));
  };

  const removeHandler = () => {
    deleteWinner(car.id);
    deleteCar(car.id)
      .unwrap()
      .then(() => {
        dispatch(removeCar(car.id));
        dispatch(updatePageCars());
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
              onClick={removeHandler}
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

export default CarCRUD;
