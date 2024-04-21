import { List, Skeleton, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setCars, setCurrentPage } from "../garageSlice";
import { useGetCarsQuery } from "../garageAPI";
import { useEffect } from "react";
import TheCar from "./Car";

const CAR_LIMIT = 7;

function GarageCars() {
  const page = useAppSelector((state) => state.garage.currentPage);
  const cars = useAppSelector((state) => state.garage.cars);
  const isCarsFetched = useAppSelector((state) => state.garage.isCarsFetched);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCarsQuery(null, { skip: isCarsFetched });

  useEffect(() => {
    if (data && !isCarsFetched) {
      dispatch(setCars(data));
    }
  }, [data]);

  const slicedCars = cars.slice((page - 1) * CAR_LIMIT, page * CAR_LIMIT);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <List
      bordered
      renderItem={(item) => <TheCar key={item.id} car={item} />}
      dataSource={slicedCars}
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
