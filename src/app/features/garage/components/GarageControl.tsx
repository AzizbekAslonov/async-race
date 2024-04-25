import {
  CaretRightOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { useAppDispatch } from "../../../hooks";
import { openModal } from "../garageSlice";

// Random Car Creation (10 points): There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.

function GarageControl() {
  const dispatch = useAppDispatch();
  return (
    <Flex justify="space-between" align="center">
      <Space size="small">
        <Button type="primary" icon={<CaretRightOutlined />}>
          Race
        </Button>
        <Button icon={<ReloadOutlined />}>Reset</Button>
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
        <Button type="primary">Generate cars</Button>
      </div>
    </Flex>
  );
}

export default GarageControl;
