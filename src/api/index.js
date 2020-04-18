import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {

    let changeableUrl = url;
    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        // return response;
        const modifiedData = { confirmed, recovered, deaths, lastUpdate }
        return modifiedData;
        // console.log(response);
    } catch (error) {
        console.log(error)
    }
}

export const fetchCountryDetails = async (country) => {
    
    let changeableUrl = url;
    if (country) {
        changeableUrl = `${url}/countries/${country}/confirmed`;
    }
    try {
        const {data} = await axios.get(changeableUrl);
        // console.log(data);
        return data;
        // console.log(response)
    } catch (error) {
        console.log(error)
    }
}


export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modifiedData;
    } catch (error) {
        console.log(error)
    }
}



export const fetchCountryData = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
        // console.log(response)
    } catch (error) {
        console.log(error)
    }
}




export const fetchLast7dayNumber = async () => {
    // console.log("1")
    try {
        const { data } = await axios.get(`${url}/daily`);
        const last7dayData = [];

        for (let i = 1; i <= 7; i++) {
            let temp = {}
            let yConfirmed = data[data.length - i].totalConfirmed - data[data.length - (i+1)].totalConfirmed;
            let yDeaths = data[data.length - i].deaths.total - data[data.length - (i+1)].deaths.total;
            let yDate = data[data.length - i].reportDate;
            temp ={
                confirmed:yConfirmed,
                deaths:yDeaths,
                date:yDate
            }
            last7dayData.push(temp)
        }
        return last7dayData;

    } catch (error) {
        console.log(error)

    }
}
