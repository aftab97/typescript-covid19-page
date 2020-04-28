import React, { useEffect, useState, JSXElementConstructor } from "react";
import { fetchGraphData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

export const Chart: React.FC = () => {
  interface IData {
    date: string;
    confirmed: number;
    deaths: number;
    china: number;
  }

  const [dailyData, setDailyData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchGraphData());
    };
    fetchAPI();
  });

  const lineChart =
    dailyData.length !== undefined ? (
      <Line
        data={{
          labels: dailyData.map((data) => data.date),
          datasets: [
            {
              data: dailyData.map((data) => data.confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map((data) => data.deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0, 0.5)",
              fill: true,
            },
            {
              data: dailyData.map((data) => data.china),
              label: "China",
              borderColor: "yellow",
              backgroundColor: "rgba(240,255,0,0.5)",
              fill: true,
            },
          ],
        }}
      ></Line>
    ) : (
      <div>Loading Data...</div>
    );

  return <div className={styles.container}>{lineChart}</div>;
};
