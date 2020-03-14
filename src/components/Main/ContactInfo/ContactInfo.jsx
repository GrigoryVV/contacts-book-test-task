import React from 'react';
import { connect } from 'react-redux';
import { Typography, Avatar, makeStyles } from '@material-ui/core';
import InfoBlock from './InfoBlock/InfoBlock';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: '0 auto',
        width: theme.spacing(18),
        height: theme.spacing(18),
        marginBottom: theme.spacing(2),
    },
}));

function ContactInfo({contactToEdit}) {

    const classes = useStyles();

    if (!contactToEdit) {
        return (
            <Typography variant="h5">
                Please select a contact to see full info
            </Typography>
        );
    }
    return (
        <div>
            <div>
                <Avatar className={classes.avatar} alt={contactToEdit.name} src={contactToEdit.avatar}/>
                <Typography variant="h6">
                    {contactToEdit.name}
                </Typography>
            </div>
            <InfoBlock title="Phone" data={contactToEdit.phone}/>
            <InfoBlock title="Email" data={contactToEdit.email}/>
            <InfoBlock title="Address" data={contactToEdit.address}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contactToEdit: state.contacts.contactToEdit
    };
}

export default connect(mapStateToProps, {})(ContactInfo);