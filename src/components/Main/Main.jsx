import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import ContactsList from './ContactsList/ContactsList';
import ContactInfo from './ContactInfo/ContactInfo';

const useStyles = makeStyles(theme => ({
    paper: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    editContainer: {
        position: 'relative',

    },
    editPannel: {
        position: 'sticky',
        top: 0,
        right: 0,
        left: 0,
        zIndex: -1,
    },
  }));

function Main(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <ContactsList/>
                </Paper>
            </Grid>
            <Grid className={classes.editContainer} item xs={12} sm={6}>
                <Paper className={classes.paper + " " + classes.editPannel}>
                    <ContactInfo/>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Main;