import React from 'react';
import { Typography, Avatar, makeStyles, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.1)
        },
        cursor: 'pointer',
    },
    contactData: {
        marginLeft: theme.spacing(2),
        textAlign: 'start'
    },
    names: {
        fontWeight: '600',
    },
    emails: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    avatars: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    },
}));

function Contact({ contact, setContactToEdit }) {
    const classes = useStyles();

    return (
        <div className={classes.container} onClick={(e) => {setContactToEdit(contact)}}>
            <div>
                <Avatar className={classes.avatars} alt={contact.name} src={contact.avatar}/>
            </div>
            <div className={classes.contactData}>
                <Typography className={classes.names} variant="body1">{contact.name}</Typography>
                <Typography variant="body2">{contact.phone}</Typography>
                <Typography className={classes.emails} variant="body2">{contact.email}</Typography>
            </div>
        </div>
    );
}

export default Contact;