import React from 'react';
import { Typography, Avatar, makeStyles, fade, useMediaQuery } from '@material-ui/core';
import ContactInfo from '../../ContactInfo/ContactInfo';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
        textAlign: 'left',
    },
    names: {
        fontWeight: '600',
    },
    emails: {
        display: 'none',
        wordBreak: 'break-all',
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
    editPanel: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

function Contact({ contact, contactToEditId, setContactToEdit }) {
    const classes = useStyles();
    const mobileLayout = useMediaQuery('(max-width:600px)');

    return (
        <>
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
        { // it'll be shown only on the screens less than 600px width
            contact.id === contactToEditId && mobileLayout &&
            <div className={classes.editPanel}>
                <ContactInfo/>
            </div>
        }
        </>
    );
}

export default Contact;