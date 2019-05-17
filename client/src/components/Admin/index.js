import React, {useState} from 'react';
import useUsers from "../../hooks/useUsers";
import {postUsers, putUsers} from "../../utils";
import {
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';
import MaterialTable from 'material-table';
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

const Admin = () => {
    const [newGuestsInput, setNewGuestsInput] = useState('');
    const [page, setPage] = useState('guestStatus');

    const {users} = useUsers();

    const handleAddGuests = () => {
        const newUsers = newGuestsInput
            .split('\n')
            .filter(val => (val.trim() !== ""))
            .map((val)=> {
                const guestData = val.split(',');
                return {
                    first_name:  guestData[0] || '',
                    last_name: guestData[1] || '',
                    guest_first_name: guestData[2] || '',
                    guest_last_name: guestData[3] || ''
                };
            });
        postUsers(newUsers);
        setNewGuestsInput('');
    };

    const handleDelete = (evt, data) => {
        putUsers(data.reduce((result, v) => {
            result[v.id] = {
                id: v.id,
                dietary: v.dietary,
                email: v.email,
                guest_mobile: v.guest_mobile,
                guest_rsvp_status: v.guest_rsvp_status,
                mobile: v.mobile,
                rsvp_status: v.rsvp_status,
                url: v.url,
                first_name: v.first_name,
                last_name: v.last_name,
                guest_first_name: v.guest_first_name,
                guest_last_name: v.guest_last_name,
                active: false
            };
            return result;
        }, {}))
    };

    return (
        (users === null) ? null :
        <>
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
                        <MaterialTable
                            columns={[
                                {title: 'Full Name', field: 'full_name'},
                                {title: 'URL', field: 'url'},
                                {title: 'RSVP Status', field: 'rsvp_status', type: 'boolean'},
                                {title: 'Email', field: 'email'},
                                {title: 'Mobile', field: 'mobile'},
                                {title: 'Dietary Restrictions', field: 'dietary'},
                                {title: 'Plus One', field: 'guest_name'},
                                {title: 'Plus One Status', field: 'guest_rsvp_status', type: 'boolean'},
                                {title: 'Plus One Mobile', field: 'guest_mobile'},
                            ]}
                            data={users.filter(v => v.active).map((v) => (
                                {
                                    id: v.id,
                                    active: v.active,
                                    dietary: v.dietary,
                                    email: v.email,
                                    full_name: v.first_name + ' ' + v.last_name,
                                    guest_mobile: v.guest_mobile,
                                    guest_name: v.guest_first_name + ' ' +v.guest_last_name,
                                    guest_rsvp_status: v.guest_rsvp_status,
                                    mobile: v.mobile,
                                    rsvp_status: v.rsvp_status,
                                    url: v.url,
                                    first_name: v.first_name,
                                    last_name: v.last_name,
                                    guest_first_name: v.guest_first_name,
                                    guest_last_name: v.guest_last_name,
                                }
                            ))}
                            title="Guest List"
                            options={{
                                selection: true
                            }}
                            actions={[
                                {
                                    tooltip: 'Remove All Selected Users',
                                    icon: 'delete',
                                    onClick: handleDelete
                                }
                            ]}
                       />
                    </Grid>
                }
            </Grid>
        </>
    );
};

export default Admin;
