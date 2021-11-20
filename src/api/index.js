import axios from "axios";

export const fetchGlobalData = async () => {
  try {
    const res = await axios.get("https://disease.sh/v3/covid-19/all");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCovidData = async () => {
  try {
    const res = await axios.get(`https://disease.sh/v3/covid-19/countries`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchhistoricalCountryData = async () => {
  try {
    const res = await axios.get(`https://disease.sh/v3/covid-19/historical?lastdays=all`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchhistoricalGlobalData = async () => {
  try {
    const res = await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
