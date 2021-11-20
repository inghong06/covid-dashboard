import React from "react";

const Cards = ({ covidData, type }) => {
  const {
    active,
    cases,
    critical,
    deaths,
    recovered,
    todayCases,
    todayDeaths,
    todayRecovered,
    updated,
  } = covidData[0];

  
  if (type == "total") {
    return (
      <div className="flex flex-col justify-center border items-center shadow-lg border-b mt-8">
        <span className="text-2xl font-bold py-1">Total Cases</span>
        <span className="text-xl font-medium">{cases.toLocaleString()}</span>
        <span className="text-sm font-medium text-blue-500 py-1">
          +{todayCases.toLocaleString()}
        </span>
      </div>
    );
  }
  if (type == "deaths") {
    return (
      <div className="flex flex-col justify-center border items-center shadow-lg border-b mt-8">
        <span className="text-2xl font-bold py-1">Total Deaths</span>
        <span className="text-xl font-medium">
          {deaths.toLocaleString()}
        </span>
        <span className="text-sm font-medium text-red-500 py-1">
          +{todayDeaths.toLocaleString()}
        </span>
      </div>
    );
  }

  if (type == "recovered") {
    return (
      <div className="flex flex-col justify-center border items-center shadow-lg border-b mt-8">
        <span className="text-2xl font-bold py-1">Total Recovered</span>
        <span className="text-xl font-medium">
          {recovered.toLocaleString()}
        </span>
        <span className="text-sm font-medium text-green-500 py-1">+{todayRecovered.toLocaleString()}</span>
      </div>
    );
  }
};

export default Cards;
