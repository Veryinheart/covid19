import React from 'react';
import Cards from './components/Cards/Cards';
import Charts from './components/Charts/Charts';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import coronaImage from './images/COV-19.png';
import { fetchData,fetchLast7dayNumber,fetchCountryDetails} from './api';
import Tables from './components/Table/Table';

class App extends React.Component {

  state = {
    data: {},
    country: '',
    last7Data:[],
    CountryDetail:[]
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    // console.log(data);
    this.setState({ data: fetchedData })

    const fetchLast7Data = await fetchLast7dayNumber();

    this.setState({last7Data:fetchLast7Data});

   
  }

  handleCountryChange = async (country) => {
    // console.log(country)
    const fetchedData = await fetchData(country);

    const fetchedCountryDetail = await fetchCountryDetails(country);

    // console.log(fetchedCountryDetail)
    // console.log(fetchedData);
      //fetch the data
      this.setState({
        data: fetchedData,
        country: country,
        CountryDetail:fetchedCountryDetail
      });
   }

  render() {
    const { data ,country,last7Data,CountryDetail} = this.state;

    return (
      <div className={styles.container}>
        <img src={coronaImage} className={styles.image} alt="COVID-19"/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Charts data={data} country={country} lastSeven={last7Data}/>
        <Tables country={country} CountryDetail={CountryDetail}/>

      </div>
    );
  }

}

export default App;
