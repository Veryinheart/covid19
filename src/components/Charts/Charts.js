import React, { useState, useEffect } from 'react';
import { fetchDailyData, } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';


function Charts({ data:{confirmed,recovered,deaths}, country ,lastSeven}) {

    const [dailyData, setDailyData] = useState([]);

    // const [yesData, setYesData] = useState({});
    const labelindex = [];
    const last7NewCase = [];
    const last7Deaths = [];
    lastSeven.map((temp)=>{
        labelindex.push(temp.date);
        last7NewCase.push(temp.confirmed);
        last7Deaths.push(temp.deaths);
    });
   
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
        ):(<div>Loading ...</div>)
    )

    const lastSevenDaybarChart = (
        confirmed ? (
            <Bar
                data={{
                    labels:labelindex,
                    datasets:[{
                        label:'Confirmed',
                        backgroundColor:[
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                        ],
                        data:last7NewCase

                    },
                    {
                        label:'Deaths',
                        backgroundColor:[
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data:last7Deaths

                    }    
                ]
                    

                }}
                options={{
                    legend:{display:false},
                    title:{display:true, text:`Last 7 days newcases and deaths in the world`}
                }}
            />
        ):null
    )

    // const yesterdayBarChart = (
    //     confirmed ? (
    //         <Bar
    //             data={{
    //                 labels:['Confirmed','Deaths',],
    //                 datasets:[{
    //                     label:'People',
    //                     backgroundColor:[
    //                         'rgba(0, 0, 255, 0.5)',
    //                         'rgba(255, 0, 0, 0.5)'
    //                     ],
    //                     data:lastSeven
    //                 }]
    //             }}
    //             options={{
    //                 legend:{display:false},
    //                 title:{display:true, text:`Yesterday data in the world, date:${yesData.date}`}
    //             }}
    //         />
    //     ):null
    // )

    return (
        <div className={styles.container}>
            {country? barChart : lineChart}
            <hr/>
            {country ? null: lastSevenDaybarChart}
        </div>
    )
}

export default Charts
