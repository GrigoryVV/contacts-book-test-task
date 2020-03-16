import React from 'react';
import { Grid, Paper, makeStyles, useMediaQuery } from '@material-ui/core';
import ContactsList from './ContactsList/ContactsList';
import ContactInfo from './ContactInfo/ContactInfo';

const useStyles = makeStyles(theme => ({
    paper: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(3),
    },
    editContainer: {
        position: 'relative',
    },
    editPannel: {
        position: 'sticky',
        top: theme.spacing(3),
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
    },
  }));

function Main() {
    const classes = useStyles();
    const desktopLayout = useMediaQuery('(min-width:600px)');

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                    <ContactsList/>
                </Paper>
            </Grid>
            {desktopLayout && // it'll be shown on the screens larger than 600px
                <Grid className={classes.editContainer} item xs={12} sm={6}>
                    <Paper className={classes.paper + " " + classes.editPannel}>
                        <ContactInfo/>
                    </Paper>
                </Grid>
            }
        </Grid>
    );
}

export default Main;