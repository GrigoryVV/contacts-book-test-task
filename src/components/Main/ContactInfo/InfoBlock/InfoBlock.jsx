import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    infoContainer: {
        margin: '16px 24px',
        textAlign: 'start',
    },
    title: {
        paddingLeft: theme.spacing(2),
    }
}));

function InfoBlock({title, data}) {

    const classes = useStyles();

    if (typeof data === 'object') {
        const dataFields = [];

        for (let key in data) {
            if (typeof data[key] !== 'object') {
                dataFields.push(
                    <Typography key={key} variant="body2">
                        {`${key}: ${data[key]}`}
                    </Typography>
                );
            }
        }

        return (
            <div className={classes.infoContainer}>
                <Typography className={classes.title} variant="body1">
                    {title}
                </Typography>
                {
                    dataFields
                }
            </div>
        );
    }

    return (
        <div className={classes.infoContainer}>
            <Typography className={classes.title} variant="body1">
                {title}
            </Typography>
            <Typography variant="body2">
                {data}
            </Typography>
        </div>
    );
}

export default InfoBlock;