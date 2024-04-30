import { Button, ConfigProvider, Flex } from "antd";
import { getButtonConfig } from "../utils/commonUtils";
import { Link } from "react-router-dom";

const garageBtnColors = ["#6253E1", "#04BEFE"];
const winnersBtnColors = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];

const Header = () => (
  <Flex gap="middle" justify="center" align="start">
    <ConfigProvider
      theme={{
        components: { Button: getButtonConfig(garageBtnColors) },
      }}
    >
      <Link to="/garage">
        <Button type="primary" size="large">
          Garage
        </Button>
      </Link>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        components: {
          Button: getButtonConfig(winnersBtnColors),
        },
      }}
    >
      <Link to="/winners">
        <Button type="primary" size="large">
          Winners
        </Button>
      </Link>
    </ConfigProvider>
  </Flex>
);

export default Header;
