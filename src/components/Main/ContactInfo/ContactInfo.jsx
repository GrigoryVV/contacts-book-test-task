import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Avatar, makeStyles, Button, TextField } from '@material-ui/core';
import InfoBlock from './InfoBlock/InfoBlock';
import { editMainContactProp, editAddressContactProp, setContactToEdit, saveChangedContact, removeContactToEdit } from '../../../redux/contactsReducer';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: '0 auto',
        width: theme.spacing(18),
        height: theme.spacing(18),
        marginBottom: theme.spacing(2),
    },
    editLayout: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        '&>*': {
            marginTop: theme.spacing(2)
        }
    }
}));

function ContactInfo({
    contacts,
    contactToEdit,
    contactToEditId,
    editMainContactProp,
    editAddressContactProp,
    setContactToEdit,
    saveChangedContact,
    removeContactToEdit
}) {

    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        setEditMode(false);
    }, [contactToEditId]);

    const contactToShow = contacts.filter(
        contact => contact.id === contactToEditId
    )[0];

    function handleMainPropChange(e) {
        const value = e.currentTarget.value;
        const property = e.currentTarget.id;

        editMainContactProp(value, property)
    }
    function handleAddressPropChange(e) {
        const value = e.currentTarget.value;
        const property = e.currentTarget.id;

        editAddressContactProp(value, property)
    }
    function handleEditCancel(contact) {
        setContactToEdit(contact);
        setEditMode(false);
    }
    function handleEditSave() {
        saveChangedContact();
        setEditMode(false);
    }
    function handleInfoClose() {
        removeContactToEdit();
    }

    if (!contactToEdit) {
        return (
            <Typography variant="h5">
                Please select a contact to see full info
            </Typography>
        );
    }
    return (
        <div>
            <Avatar className={classes.avatar} alt={contactToShow.name} src={contactToShow.avatar}/>
            {
                editMode
                ? <div className={classes.editLayout}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.name}
                        onChange={handleMainPropChange}
                        id="name" 
                        label="Name"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.phone}
                        onChange={handleMainPropChange}
                        id="phone" 
                        label="Phone"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.email}
                        onChange={handleMainPropChange}
                        id="email" 
                        label="Email"
                    />
                    <Typography variant="body1">
                        Address
                    </Typography>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.streetA}
                        onChange={handleAddressPropChange}
                        id="streetA" 
                        label="StreetA"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.streetB}
                        onChange={handleAddressPropChange}
                        id="streetB" 
                        label="StreetB"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.streetC}
                        onChange={handleAddressPropChange}
                        id="streetC" 
                        label="StreetC"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.streetD}
                        onChange={handleAddressPropChange}
                        id="streetD" 
                        label="StreetD"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.city}
                        onChange={handleAddressPropChange}
                        id="city" 
                        label="City"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.state}
                        onChange={handleAddressPropChange}
                        id="state" 
                        label="State"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.country}
                        onChange={handleAddressPropChange}
                        id="country" 
                        label="Country"
                    />
                    <TextField 
                        variant="outlined"
                        fullWidth
                        value={contactToEdit.address.zipcode}
                        onChange={handleAddressPropChange}
                        id="zipcode" 
                        label="ZipCode"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditSave}
                    >
                        Save
                    </Button>
                    <Button
                        style={{marginLeft: 16}}
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEditCancel(contactToShow)}
                    >
                        Cancel
                    </Button>
                </div>
                : <>
                    <Typography variant="h6">
                        {contactToShow.name}
                    </Typography>
                    <InfoBlock title="Phone" data={contactToShow.phone}/>
                    <InfoBlock title="Email" data={contactToShow.email} />
                    <InfoBlock title="Address" data={contactToShow.address} />
                    <Button variant="contained" color="primary"
                        onClick={(e) => setEditMode(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        style={{marginLeft: 16}}
                        variant="contained"
                        color="secondary"
                        onClick={handleInfoClose}
                    >
                        Close
                    </Button>
                </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.contacts,
        contactToEdit: state.contacts.contactToEdit,
        contactToEditId: state.contacts.contactToEditId,
    };
}

export default connect(mapStateToProps,
    { 
        editMainContactProp,
        editAddressContactProp,
        setContactToEdit,
        saveChangedContact,
        removeContactToEdit
    }
)(ContactInfo);