import { Flex, Input, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { closeModal, setCurrentCar } from "../garageSlice";

function GarageModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.garage.isOpen);
  const isEditing = useAppSelector((state) => state.garage.isEditing);
  const currentCar = useAppSelector((state) => state.garage.currentCar);

  const handleOk = () => {};

  const handleCancel = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      title={isEditing ? "Edit car" : "Add car"}
      open={isOpen}
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
