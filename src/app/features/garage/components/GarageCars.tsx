import { List, Skeleton, Typography } from "antd";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useGarageContext,
} from "../../../hooks";
import { useGetCarsQuery } from "../garageAPI";
import { setCars, setCurrentPage } from "../garageSlice";
import TheCar from "./Car";

const CAR_LIMIT = 7;

function GarageCars() {
  const page = useAppSelector((state) => state.garage.currentPage);
  const cars = useAppSelector((state) => state.garage.cars);
  const isCarsFetched = useAppSelector((state) => state.garage.isCarsFetched);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCarsQuery(null, { skip: isCarsFetched });
  // const { setCarsAnimationStates } = useGarageContext();

  useEffect(() => {
    if (data && !isCarsFetched) {
      // const slicedCars = data.slice((page - 1) * CAR_LIMIT, page * CAR_LIMIT);
      // setCarsAnimationStates
      // setCarsAnimationStates(slicedCars);
      dispatch(setCars(data));
    }
  }, [data]);

  // useEffect(() => {
  // return () => {
  //   dispatch(setAllAnimationStateWaiting());
  // };
  // }, []);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <List
      bordered
      renderItem={(item, index) => (
        <TheCar key={item.id} index={index} car={item} />
      )}
      dataSource={cars.slice((page - 1) * CAR_LIMIT, page * CAR_LIMIT)}
      pagination={{
        className: "text-right",
        showSizeChanger: false,
        showLessItems: true,
        total: cars.length || 0,
        current: page,
        onChange: (page) => dispatch(setCurrentPage(page)),
        pageSize: CAR_LIMIT,
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
