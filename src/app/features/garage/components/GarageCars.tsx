import { List, Skeleton, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setCars, setCurrentPage } from "../garageSlice";
import { useGetCarsQuery } from "../garageAPI";
import { useEffect } from "react";
import Car from "./Car";

const CAR_LIMIT = 7;

function GarageCars() {
  const currentPage = useAppSelector((state) => state.garage.currentPage);
  const cars = useAppSelector((state) => state.garage.cars);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCarsQuery();

  useEffect(() => {
    if (data) dispatch(setCars(data));
  }, [data]);

  const slicedCars = cars.slice(
    (currentPage - 1) * CAR_LIMIT,
    currentPage * CAR_LIMIT
  );

  return isLoading ? (
    <Skeleton active />
  ) : (
    <List
      bordered
      renderItem={(item) => <Car key={item.id} car={item} />}
      dataSource={slicedCars}
      pagination={{
        className: "text-right",
        showSizeChanger: false,
        showLessItems: true,
        total: cars.length || 0,
        current: currentPage,
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
