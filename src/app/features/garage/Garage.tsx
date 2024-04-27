import { Flex } from "antd";
import PageLayout from "../../../components/PageLayout";
import GarageCars from "./components/GarageCars";
import GarageControl from "./components/GarageControl";
import GarageModals from "./components/GarageModals";

function Garage() {
  return (
    <PageLayout title="Garage">
      <Flex gap="large" vertical>
        <GarageControl />
        <GarageModals />
        <GarageCars />
      </Flex>
    </PageLayout>
  );
}

export default Garage;
