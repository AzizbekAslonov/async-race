import {
  CaretRightOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  appendCars,
  openModal,
  setPageCars,
  startRace,
  stopRace,
} from "../garageSlice";
import { AnimationState, Car } from "../garageTypes";
import { useMemo, useState } from "react";
import { usePostCarMutation } from "../garageAPI";
import {
  MODELS,
  COLORS,
  getRandomElementFrom,
  BRANDS,
} from "../../../../utils/utils";

// Random Car Creation (10 points): There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.

function GarageControl() {
  const dispatch = useAppDispatch();
  const pageCars = useAppSelector((s) => s.garage.pageCars);
  const [postNewCar, { isLoading }] = usePostCarMutation();
  const [generateBtnDisabled, setGenerateBtnDisabled] = useState(false);

  const generateCars = () => {
    setGenerateBtnDisabled(true);
    const promises = Array.from({ length: 2 }, () => {
      return postNewCar({
        color: getRandomElementFrom(COLORS),
        name: `${getRandomElementFrom(BRANDS)} ${getRandomElementFrom(MODELS)}`,
      }).unwrap();
    });

    const newCars: Car[] = [];
    Promise.allSettled(promises).then((results) => {
      setGenerateBtnDisabled(false);
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          newCars.push(result.value);
        }
      });
      dispatch(appendCars(newCars));
      dispatch(setPageCars());
    });
  };

  const raceAll = () => {
    dispatch(startRace());
  };

  const stopAll = () => {
    dispatch(stopRace());
  };

  const isReadyToRace = pageCars.every(
    (c) => c.animation.state === AnimationState.Initial
  );

  const isReadyToStop = useMemo(() => {
    return (
      !isReadyToRace &&
      pageCars.every((car) => {
        const { state } = car.animation;
        return (
          state === AnimationState.Waiting || state === AnimationState.Initial
        );
      })
    );
  }, [isReadyToRace, pageCars]);

  return (
    <Flex justify="space-between" align="center">
      <Space size="small">
        <Button
          disabled={!isReadyToRace}
          onClick={raceAll}
          type="primary"
          icon={<CaretRightOutlined />}
        >
          Race
        </Button>
        <Button
          disabled={!isReadyToStop}
          onClick={stopAll}
          icon={<ReloadOutlined />}
        >
          Reset
        </Button>
      </Space>
      <div>
        <Button
          type="primary"
          onClick={() => dispatch(openModal())}
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </div>
      <div>
        <Button
          disabled={generateBtnDisabled}
          onClick={generateCars}
          type="primary"
        >
          Generate cars
        </Button>
      </div>
    </Flex>
  );
}

export default GarageControl;
