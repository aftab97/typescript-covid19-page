import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    // const modifiedData = {
    //   confirmed: confirmed,
    //   recovered: recovered,
    //   deaths: deaths,
    //   lastUpdate: lastUpdate,
    // };

    return {
      confirmed: confirmed,
      recovered: recovered,
      deaths: deaths,
      lastUpdate: lastUpdate,
    };
  } catch (error) {}
};

export const fetchGraphData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    // console.log(data);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      china: dailyData.mainlandChina,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};
