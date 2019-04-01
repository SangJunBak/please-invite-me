import React, {useState} from 'react';
import useAddGuests from '../hooks/useAddGuests';
import {
        Grid,
        AppBar,
        Toolbar,
        Typography,
        Button } from '@material-ui/core';
import EnhancedTable from './EnhancedTable.js';
import AddForm from './AddForm.js';

const styles = {
    centerText: {
        textAlign: "center"
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};

function Admin() {
    const [newGuestsInput, setNewGuestsInput] = useState('');
    const [page, setPage] = useState('guestStatus');

    function handleAddGuests() {
        const newGuests =
            newGuestsInput
                .split('\n')
                .filter(val => (val.trim() !== ""))
                .map((val)=> {
                    const guestData = val.split(',');
                    let newGuestObj = {};
                    guestData[0] ? (newGuestObj["user_first_name"] = guestData[0]) : (newGuestObj["user_first_name"] = "");
                    guestData[1] ? (newGuestObj["user_last_name"] = guestData[1]) : (newGuestObj["user_last_name"] = "");
                    guestData[2] ? (newGuestObj["guest_first_name"] = guestData[2]) : (newGuestObj["guest_first_name"] = "");
                    guestData[3] ? (newGuestObj["guest_last_name"] = guestData[3]) : (newGuestObj["guest_last_name"] = "");
                    return newGuestObj;
                });
        useAddGuests(newGuests);
        setNewGuestsInput('');
    }

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={styles.grow}>
                        Admin Dashboard
                    </Typography>
                    <Button color="inherit" onClick = {()=> setPage("guestStatus")}>Guest Status</Button>
                    <Button color="inherit" onClick = {()=> setPage("guestAdd")}>Add Guests</Button>
                </Toolbar>
            </AppBar>

            <Grid container justify='center'>
                {page === "guestAdd" &&
                <Grid item xs={11}>
                    <AddForm
                        newGuests={newGuestsInput}
                        handleInput={setNewGuestsInput}
                        handleAddGuests={handleAddGuests}
                    />
                </Grid>
                }
                {page === "guestStatus" &&
                <Grid item xs={12}>
                    <EnhancedTable/>
                </Grid>
                }

            </Grid>
        </React.Fragment>
    );

}

export default Admin;
