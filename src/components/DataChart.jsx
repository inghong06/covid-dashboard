import React, { useEffect, useState } from "react";
import { fetchhistoricalCountryData, fetchhistoricalGlobalData } from "../api";
import { Line, Bar } from "react-chartjs-2";

const DataChart = ({ countryName, type }) => {
  const [dailyCountryData, setDailyCountryData] = useState([]);
  const [dailyGlobalData, setDailyGlobalData] = useState([]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchhistoricalCountryData();

      setDailyCountryData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchhistoricalGlobalData();

      setDailyGlobalData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  if (dailyCountryData.length == 0) return "Loading";

  const historicalData = [...dailyCountryData];
  const GlobalData = { country: "World", timeline: dailyGlobalData };
  //   dailyGlobalData["country"] = "World";

  historicalData.unshift(GlobalData);

  const filteredData = historicalData.filter(({ country }) =>
    country.includes(countryName)
  );

  console.log(filteredData);
  const {
    timeline: { cases, deaths, recovered },
  } = filteredData[0];

  const dailyCases = [];
  const dailyDeaths = [];
  const tempCases = Object.values(cases);
  const tempDeaths = Object.values(deaths);

  for (let i = 0; i < tempCases.length; i++) {
    if (tempCases[i + 1] != undefined) {
      dailyCases.push(Math.abs(tempCases[i] - tempCases[i + 1]));
    }
  }

  for (let i = 0; i < tempDeaths.length; i++) {
    if (tempDeaths[i + 1] != undefined) {
      dailyDeaths.push(Math.abs(tempDeaths[i] - tempDeaths[i + 1]));
    }
  }

  const casesLineChart = filteredData[0] ? (
    <Line
      data={{
        labels: Object.keys(cases),
        options: {
          plugins: {
            title: {
              display: true,
              text: "test",
            },
          },
        },
        datasets: [
          {
            data: Object.values(cases),
            label: "Infected",
            borderColor: "#F59E0B",
            backgroundColor: "#FCD34D",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const deathLineChart = filteredData[0] ? (
    <Line
      data={{
        labels: Object.keys(deaths),
        datasets: [
          {
            data: Object.values(deaths),
            label: "Deaths",
            borderColor: "#DC2626",
            backgroundColor: "#FCA5A5",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const DailyCasesBarChart = filteredData[0] ? (
    <Bar
      data={{
        labels: Object.keys(cases),
        datasets: [
          {
            data: dailyCases,
            label: "Infected",
            borderColor: "#F59E0B",
            backgroundColor: "#FCD34D",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const DailyDeathsBarChart = filteredData[0] ? (
    <Bar
      data={{
        labels: Object.keys(cases),
        datasets: [
          {
            data: dailyDeaths,
            label: "Infected",
            borderColor: "#DC2626",
            backgroundColor: "#FCA5A5",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  if (type == "caseTotal") {
    return <div className="mt-8">{casesLineChart}</div>;
  }

  if (type == "deathTotal") {
    return <div className="mt-8">{deathLineChart}</div>;
  }

  if (type == "caseDaily") {
    return <div className="mt-8">{DailyCasesBarChart}</div>;
  }

  if (type == "deathDaily") {
    return <div className="mt-8">{DailyDeathsBarChart}</div>;
  }
};

export default DataChart;
