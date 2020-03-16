import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Contact from './Contact/Contact';
import { setContactToEdit } from '../../../redux/contactsReducer';

function ContactsList(props) {

    function getFilteredContacts(search, contacts) {
        // function that filters contacts when start typing in the search field
        if (!search) {
            return contacts;
        }
        return contacts.filter(contact => {
            return contact['name'].toLowerCase().includes(search.toLowerCase())
        })
    }
    const filteredContacts = getFilteredContacts(props.search, props.contacts)

    return (
        <Fragment>
            <Typography variant="h5">Contacts</Typography>
            {
                filteredContacts.map((contact, i, contacts) => {
                    if ( i === 0 ||
                        contact.name[0].toUpperCase() !== contacts[i-1].name[0].toUpperCase()
                    ) {
                        return <Fragment key={contact.id}>
                            <Typography variant="h6"
                                style={{
                                    textAlign: 'right',
                                    paddingRight: 24,
                                    backgroundColor: '#F5F5F5'
                                }}
                            >
                                {contact.name[0].toUpperCase()}
                            </Typography>
                            <Contact
                            contact={contact}
                            contactToEditId={props.contactToEditId}
                            setContactToEdit={props.setContactToEdit}
                            />
                        </Fragment>
                    } else {
                        return <Contact key={contact.id} 
                            contact={contact}
                            contactToEditId={props.contactToEditId}
                            setContactToEdit={props.setContactToEdit}
                        />
                    }
                })
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.contacts,
        contactToEditId: state.contacts.contactToEditId,
        search: state.contacts.search
    };
}

export default connect(mapStateToProps,
    { setContactToEdit }
)(ContactsList);