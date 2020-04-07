import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

function Charts({ data:{confirmed,recovered,deaths}, country }) {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            // console.log(dailyData);
            setDailyData(dailyData);
        }

        fetchAPI();
    }, [])

    // console.log(dailyData);

    const lineChart = (
        dailyData.length ?
            (<Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Confirmed',
                        borderColor: '#406DA0',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(244,96,108,0.5)',
                        fill: true,
                    }

                        // {
                        //     data: dailyData.map(({recovered})=>recovered),
                        //     label:'Recovered',
                        //     borderColor:'#00FF00',
                        //     fill:true,
                        // },
                    ]
                }}
            />) : null
    );
    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels:['Confirmed','Recovered','Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:[
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data:[confirmed.value,recovered.value,deaths.value]

                    }]
                    

                }}
                options={{
                    legend:{display:false},
                    title:{display:true, text:`Current state in ${country}`}
                }}
            />
        ):null
    )
    return (
        <div className={styles.container}>
            {country? barChart : lineChart}
        </div>
    )
}

export default Charts
