import { Flex, Input, Modal, Typography, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { usePostCarMutation, usePutCarMutation } from "../garageAPI";
import {
  addNewCar,
  closeModal,
  setCurrentCar,
  updatePageCars,
  editExistingCar,
} from "../garageSlice";

function GarageModals() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.garage.isOpen);
  const currentCar = useAppSelector((state) => state.garage.currentCar);
  const [postNewCar, { isLoading }] = usePostCarMutation();
  const [putCar, { isLoading: isPutLoading }] = usePutCarMutation();

  const okHandler = () => {
    if (!currentCar.name || !currentCar.color) {
      return notification["error"]({ message: "Fill required fields" });
    }

    if (currentCar.id) {
      const { id, ...body } = currentCar;
      putCar({ id, body })
        .unwrap()
        .then((newCar) => {
          dispatch(editExistingCar(newCar));
          dispatch(updatePageCars());
        });
    } else {
      postNewCar({ ...currentCar })
        .unwrap()
        .then((newCar) => {
          dispatch(addNewCar(newCar));
          dispatch(updatePageCars());
        });
    }
  };

  const calcelHandler = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Modal
        title={currentCar.id ? "Edit car" : "Add car"}
        open={isOpen}
        okButtonProps={{ disabled: isLoading || isPutLoading }}
        onOk={okHandler}
        onCancel={calcelHandler}
      >
        <Flex vertical>
          <div>
            <Typography.Title level={5}>Enter name</Typography.Title>
            <Input
              value={currentCar.name}
              onChange={(e) =>
                dispatch(setCurrentCar({ key: "name", value: e.target.value }))
              }
            />
          </div>
          <div>
            <Typography.Title level={5}>Pick Color</Typography.Title>
            <Input
              onChange={(e) =>
                dispatch(setCurrentCar({ key: "color", value: e.target.value }))
              }
              value={currentCar.color}
              type="color"
            />
          </div>
        </Flex>
      </Modal>
    </>
  );
}

export default GarageModals;
