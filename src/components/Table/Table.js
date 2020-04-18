import React from 'react';
import { Table } from 'antd';
import styles from './Table.module.css'
const Tables = ({country,CountryDetail})=> {

    // console.log(CountryDetail);
    // console.log(country);
    // CountryDetail.map();
    const data = []
    CountryDetail.map((PS)=>{
        let temp = {};
        temp.ps=PS.provinceState;
        temp.confirmed =PS.confirmed;
        temp.deaths = PS.deaths;
        temp.recovered = PS.recovered;
        temp.key = PS.uid;
        data.push(temp);
    })

    // console.log(data);

    const columns = [
        {
            title: 'ProvinceState',
            dataIndex: 'ps',
            key: 'ps',
        },
        {
            title: 'Confirmed',
            dataIndex: 'confirmed',
            key: 'confirmed',
        },
        {
            title: 'Deaths',
            dataIndex: 'deaths',
            key: 'deaths',
        },
        {
            title: 'Recovered',
            dataIndex: 'recovered',
            key: 'recovered',
        },
    ];
    return (
        <div className={styles.container}>
            {country ? <Table columns={columns} dataSource={data}/>: null}
            
        </div>
    )
}

export default Tables;
