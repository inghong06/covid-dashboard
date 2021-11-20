import React, { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { fetchCovidData, fetchGlobalData } from "./api";
import Cards from "./components/Cards";
import worldFlag from "./assets/globe.png";
import DataChart from "./components/DataChart";

const App = () => {
  const [globalData, setGlobalData] = useState([]);
  const [allCountriesData, setAllCountriesData] = useState([]);
  const [countryName, setCountryName] = useState("World");

  useEffect(() => {
    const fetchApi = async () => {
      const temp = await fetchCovidData();
      setAllCountriesData(temp);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const temp = await fetchGlobalData();
      setGlobalData(temp);
    };

    fetchApi();
  }, []);

  if (allCountriesData.length === 0) {
    return <div>Loading</div>;
  }

  const allData = [...allCountriesData];
  const newGlobalData = globalData;
  newGlobalData["country"] = "World";
  newGlobalData["countryInfo"] = { flag: "dummy" };
  allData.unshift(newGlobalData);
  const filteredData = allData.filter(({ country }) =>
    country.includes(countryName)
  );
  const dateObject = new Date(filteredData[0].updated);
  const updatedDate =
    dateObject.toLocaleDateString("en-GB") +
    " " +
    dateObject.toLocaleTimeString();

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-8">
        <Menu as="div" className="relative inline-block text-center w-64">
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-xl font-medium text-black bg-gray-300 border border-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span>{countryName}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-6 ml-1 pt-1 absolute right-1 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Menu.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div className="">
              <Menu.Items className=" overflow-y-auto max-h-60 absolute left-0 mt-2 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto">
                {allData.map(({ country, countryInfo: { flag } }) => (
                  <Menu.Item key={country}>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "bg-blue-500"
                        } text-xl text-black hover:text-white py-1 cursor-pointer bg-white flex items-center`}
                        onClick={(e) => setCountryName(country)}
                      >
                        <div className="w-8 h-auto py-1 ml-2">
                          <img src={country != "World" ? flag : worldFlag} />
                        </div>
                        <span className="ml-2 pr-1 text-center container">
                          {country}
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </div>
          </Transition>
        </Menu>
      </div>
      <div className="flex flex-col mx-auto px-4 justify-center mt-8 ">
        <span className="text-center font-medium text-lg">
          Updated: {updatedDate}
        </span>
        <span className="text-center">
          Source:{" "}
          <a
            href="https://disease.sh/docs/?urls.primaryName=version%203.0.0"
            rel="noreferrer"
            target="_blank"
            className="hover:text-blue-500"
          >
            NovelCoVID19 API 
          </a>
          &nbsp;by&nbsp;
          <a
            href="https://disease.sh/"
            rel="noreferrer"
            target="_blank"
            className="hover:text-blue-500"
          >
            disease.sh
          </a>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-1 lg:col-span-4">
          <Cards covidData={filteredData} type="total" />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <Cards covidData={filteredData} type="deaths" />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <Cards covidData={filteredData} type="recovered" />
        </div>
      </div>
      <DataChart countryName={countryName} />
    </div>
  );
};

export default App;
