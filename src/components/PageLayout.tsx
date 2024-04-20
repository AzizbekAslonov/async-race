import { Flex, Space, Typography } from "antd";
import Header from "./Header";
import { ReactNode } from "react";

const { Title } = Typography;

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <Flex gap="large" vertical>
        <Title>{title}</Title>
        <div>{children}</div>
      </Flex>
    </>
  );
}

export default PageLayout;
