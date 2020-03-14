import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Contact from './Contact/Contact';
import { setContactToEdit } from '../../../redux/contactsReducer';

function ContactsList(props) {
    return (
        <Fragment>
            <Typography variant="h5">Contacts</Typography>
            {
                props.contacts.map(contact => {
                    return <Contact key={contact.id} 
                        contact={contact}
                        setContactToEdit={props.setContactToEdit}
                    />
                })
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.contacts
    };
}

export default connect(mapStateToProps,
    { setContactToEdit }
)(ContactsList);