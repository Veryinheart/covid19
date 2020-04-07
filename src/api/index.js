import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);
        // return response;
        const modifiedData = { confirmed, recovered, deaths, lastUpdate }

        return modifiedData;
        // console.log(response);
    } catch (error) {

    }
}