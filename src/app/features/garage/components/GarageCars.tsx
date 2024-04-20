import { List, Pagination, Typography } from "antd";

function GarageCars() {
  return (
    <List
      footer={
        <Pagination
          className="text-right"
          total={900}
          showSizeChanger={false}
          showLessItems={true}
          defaultPageSize={20}
          defaultCurrent={2}
          showTotal={(total) => (
            <Typography.Title className="m-0" level={4}>
              Total {total} items
            </Typography.Title>
          )}
        />
      }
      bordered
      dataSource={[1, 2, 3]}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
}

export default GarageCars;
