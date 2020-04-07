import React from 'react';
import Cards from './components/Cards/Cards';
import Charts from './components/Charts/Charts';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import coronaImage from './images/COV-19.png';
import { fetchData } from './api';

class App extends React.Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    // console.log(data);
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    console.log(country)
    const fetchedData = await fetchData(country);

    console.log(fetchedData);
      //fetch the data
      this.setState({
        data: fetchedData,
        country: country
      });
   }

  render() {
    const { data ,country} = this.state;

    return (
      <div className={styles.container}>
        <img src={coronaImage} className={styles.image} alt="COVID-19"/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Charts data={data} country={country}/>

      </div>
    );
  }

}

export default App;
