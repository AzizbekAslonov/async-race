import { TableColumnsType } from "antd";
import { getCarImage } from "./garageUtils";
import { WinnersDataType } from "../app/features/winners/types/winnerTypes";

export const winnersColumns: TableColumnsType<WinnersDataType> = [
  {
    title: "№",
    dataIndex: "id",
  },
  {
    title: "Car",
    dataIndex: "color",
    render: (color: string) => getCarImage(color),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Wins",
    dataIndex: "wins",
    sorter: (a, b) => a.wins - b.wins,
  },
  {
    title: "Best time (seconds)",
    dataIndex: "time",
    sorter: (a, b) => a.time - b.time,
  },
];
