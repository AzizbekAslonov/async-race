import { useRef } from "react";
import { Car } from "../garageTypes";
import { Button, Flex, List, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../hooks";
import { filterCars, openModal } from "../garageSlice";
import { useDeleteCarMutation } from "../garageAPI";
import { animateCar, getCarImage } from "../../../../utils/utils";

function TheCar({ car }: { car: Car }) {
  const dispatch = useAppDispatch();
  const carRef = useRef<HTMLDivElement>(null);
  const [deleteCar, { isLoading: isDelLoading }] = useDeleteCarMutation();

  const removeCar = () => {
    deleteCar(car.id)
      .unwrap()
      .then(() => {
        dispatch(filterCars(car.id));
      });
  };

  const startHandler = () => {
    const animation = animateCar(10000, carRef.current!);
    console.log(animation);
  };
  const stopHandler = () => {};

  return (
    <List.Item>
      <Flex align="center" gap="small">
        {/* start/stop */}
        <Flex gap="middle" justify="center" vertical>
          <Button onClick={startHandler} type="primary" size="small">
            Start
          </Button>
          <Button onClick={stopHandler} size="small">
            Stop
          </Button>
        </Flex>
        {/* edit/delete */}
        <div>
          <Flex align="center" vertical>
            <Typography.Paragraph className="m-0">
              {car.name}
            </Typography.Paragraph>
            <div ref={carRef} className="car-image">
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
