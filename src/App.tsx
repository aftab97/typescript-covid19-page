import React, { useEffect } from "react";
import { Cards } from "./components/Cards/Cards";
import { Chart } from "./components/Chart/Chart";
import styles from "./App.module.css";
import { fetchData, fetchGraphData } from "./api";

export const App: React.FC = () => {
  interface IData {
    confirmed: number;
    recovered: number;
    deaths: number;
    lastupdate: string;
  }

  const [data, setData] = React.useState<IData>({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    lastupdate: "",
  });

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      const data = await fetchData();
      const graphData = await fetchGraphData();

      const newData: IData = {
        confirmed: data?.confirmed.value,
        deaths: data?.deaths.value,
        lastupdate: data?.lastUpdate,
        recovered: data?.recovered.value,
      };

      setData(newData);
      console.log(graphData);
    }

    // Execute the created function directly
    anyNameFunction();
  }, []);

  return (
    // This makes it so the styling only applies over the certain components
    <div className={styles.container}>
      <h1>COVID-19</h1>
      <Cards
        confirmed={data.confirmed}
        deaths={data.deaths}
        recovered={data.recovered}
        lastUpdate={data.lastupdate}
      />
      <h2>World Stats</h2>
      <Chart />
    </div>
  );
};

export default App;
