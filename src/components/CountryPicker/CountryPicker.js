import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';
import { fetchCountryData } from '../../api';

function CountryPicker({handleCountryChange}) {

    const [fetchCountries, setFetchCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchCountries(await fetchCountryData());
        }
        fetchAPI();

    }, [setFetchCountries])

    // console.log(fetchCountries);

    return (
        
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchCountries.map((country, i) => (<option key={i} value={country}>{country}</option>))}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
