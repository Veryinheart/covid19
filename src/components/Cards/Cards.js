import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';


function Cards(props) {

    const { confirmed, recovered, deaths, lastUpdate } = props.data;
    if (!confirmed) {
        return 'loading'
    }
    // console.log(props)
    // const {confirmed, recovered, dealths,lastUpdate} = props;
    return (
        <div className={styles.container}>

            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.confirmed)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration={1.0}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">Update Time:{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                 <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={recovered.value}
                                duration={1.0}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">Update Time:{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of recoveries of COVID-19</Typography>
                    </CardContent>
                </Grid>
                 <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={deaths.value}
                                duration={1.0}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">Update Time:{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of dealths by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
