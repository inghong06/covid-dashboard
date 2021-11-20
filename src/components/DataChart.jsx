import React, {useEffect, useState} from 'react'
import { fetchhistoricalCountryData, fetchhistoricalGlobalData } from '../api'
import { Line } from "react-chartjs-2";

const DataChart = ({countryName}) => {
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

if (dailyCountryData.length == 0) return "Loading"

  const historicalData = [...dailyCountryData];
  const GlobalData = {country: "World", timeline: dailyGlobalData};
//   dailyGlobalData["country"] = "World";

  historicalData.unshift(GlobalData);


  const filteredData= historicalData.filter(({country}) => country.includes(countryName))


  const {timeline: {cases, deaths, recovered}} = filteredData[0]

  const lineChart = (
    filteredData[0] ? (
      <Line
        data={{
          labels: Object.keys(cases),
          datasets: [{
            data: Object.values(cases),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: Object.values(deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }, {
            data: Object.values(recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          }
        
          ],
        }}
      />
    ) : null
  );

    return (
        <div className="mt-8">{lineChart}
        </div>
    )
}

export default DataChart
