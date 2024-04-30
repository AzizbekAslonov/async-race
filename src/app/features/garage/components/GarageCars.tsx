import { List, Skeleton, Typography } from "antd";
import { useEffect, useMemo } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useGarageContext,
} from "../../../hooks";
import { useGetCarsQuery } from "../garageAPI";
import { setCars, updatePageCars } from "../garageSlice";
import TheCar from "./Car";
import { AnimationState } from "../types/garageTypes";

function GarageCars() {
  const { setCarsAnimationStates } = useGarageContext();
  const page = useAppSelector((state) => state.garage.currentPage);
  const pageCars = useAppSelector((state) => state.garage.pageCars);
  const carPerPage = useAppSelector((state) => state.garage.carPerPage);
  const isCarsFetched = useAppSelector((state) => state.garage.isCarsFetched);
  const cars = useAppSelector((state) => state.garage.cars);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCarsQuery(null, {
    skip: isCarsFetched,
  });

  const paginateTo = (n: number) => {
    dispatch(updatePageCars(n));
    setCarsAnimationStates();
  };

  useEffect(() => {
    if (data && !isCarsFetched) {
      dispatch(setCars(data));
      dispatch(updatePageCars());
    }
  }, [data]);

  const isReadyToRace = pageCars.every((c) => {
    const { state, translateX } = c.animation;
    return (
      state === AnimationState.Initial ||
      (state === AnimationState.Waiting && translateX !== null)
    );
  });

  return isLoading ? (
    <Skeleton active />
  ) : (
    <List
      bordered
      renderItem={(item, index) => (
        <TheCar key={item.id} index={index} car={item} />
      )}
      dataSource={pageCars}
      pagination={{
        disabled: !isReadyToRace,
        className: "text-right",
        showSizeChanger: false,
        showLessItems: true,
        total: cars.length || 0,
        current: page,
        onChange: paginateTo,
        pageSize: carPerPage,
        showTotal: (total) => (
          <Typography.Title className="m-0" level={4}>
            Total {total} items
          </Typography.Title>
        ),
      }}
    />
  );
}

export default GarageCars;
