import { Skeleton, Table, Typography } from "antd";
import { useGetWinnersQuery } from "../winnersAPI";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setCurrentPage } from "../winnersSlice";
import { winnersColumns } from "../../../../utils/winnersUtils";

function WinnersTable() {
  const pageSize = useAppSelector((s) => s.winners.pageSize);
  const currentPage = useAppSelector((s) => s.winners.currentPage);
  const { data, isLoading } = useGetWinnersQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();

  return isLoading || !data ? (
    <Skeleton active />
  ) : (
    <Table
      columns={winnersColumns}
      rowKey="id"
      dataSource={data.slice(
        (currentPage - 1) * pageSize,
        pageSize * currentPage
      )}
      pagination={{
        showSizeChanger: false,
        showLessItems: true,
        total: data.length,
        current: currentPage,
        onChange: (page) => dispatch(setCurrentPage(page)),
        pageSize: pageSize,
        showTotal: (total) => (
          <Typography.Title className="m-0" level={4}>
            Total {total} items
          </Typography.Title>
        ),
      }}
    />
  );
}

export default WinnersTable;
