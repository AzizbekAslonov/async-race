import {
  CaretRightOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { useAppDispatch } from "../../../hooks";
import { openModal } from "../garageSlice";

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
