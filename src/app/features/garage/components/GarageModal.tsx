import { Flex, Input, Modal, Typography, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  addNewCar,
  updateCar,
  closeModal,
  setCurrentCar,
} from "../garageSlice";
import { usePostCarMutation, usePutCarMutation } from "../garageAPI";

function GarageModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.garage.isOpen);
  const isEditing = useAppSelector((state) => state.garage.isEditing);
  const currentCar = useAppSelector((state) => state.garage.currentCar);
  const [postNewCar, { isLoading }] = usePostCarMutation();
  const [putCar, { isLoading: isPutLoading }] = usePutCarMutation();

  const handleOk = () => {
    if (!currentCar.name || !currentCar.color) {
      return notification["error"]({ message: "Fill required fields" });
    }
    if (isEditing) {
      const { id, ...body } = currentCar;
      putCar({ id: currentCar.id!, body })
        .unwrap()
        .then((newCar) => {
          dispatch(updateCar(newCar));
        });
    } else {
      postNewCar({ ...currentCar })
        .unwrap()
        .then((newCar) => {
          dispatch(addNewCar(newCar));
        });
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      title={isEditing ? "Edit car" : "Add car"}
      open={isOpen}
      okButtonProps={{ disabled: isLoading || isPutLoading }}
      onOk={handleOk}
      onCancel={handleCancel}
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
  );
}

export default GarageModal;
