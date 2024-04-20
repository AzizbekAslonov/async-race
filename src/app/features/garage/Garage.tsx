import { Flex } from "antd";
import GarageCars from "./components/GarageCars";
import GarageControl from "./components/GarageControl";
import GarageModal from "./components/GarageModal";
import PageLayout from "../../../components/PageLayout";

function Garage() {
  return (
    <PageLayout title="Garage">
      <Flex gap="large" vertical>
        <GarageControl />
        <GarageModal />
        <GarageCars />
      </Flex>
    </PageLayout>
  );
}

export default Garage;
