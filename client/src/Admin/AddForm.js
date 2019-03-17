import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import {
        Paper,
        Typography,
        Grid,
    } from '@material-ui/core/';

const styles = {
    root: {
        paddingTop: "30px"
    },
    paper: {
      padding:"50px"
    },
    fullWidthButton: {
        width: "100%"
    }
}

const AddForm = (props) => {
    return (
        <div style={styles.root}>
            <Paper style ={styles.paper}>
                <Grid container alignContent={'space-between'} spacing={32}>
                    <Grid item xs={6}>
                        <TextField
                            name="newGuests"
                            value={props.newGuests}
                            onChange={props.handleInput}
                            fullWidth
                            multiline
                            rows={'10'}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={'body1'}>
                            To add a guest and his/her plus one, follow this template:
                            <br/>
                            <code>guest_first_name,guest_last_name,plus_one_first_name,plus_one_last_name</code>
                            <br/>
                            <br/>
                            Followed by a line break for each guest.
                            <br/>
                            White space does not matter. If the guest has no plus one, just do 1 comma.
                            <br/>
                            <br/>
                            Example: <br/>
                            <code>Mary,Smith,John,Smith</code>
                            <br/>
                            <code>Sang Jun,Bak</code>
                        </Typography>

                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            styles={styles.fullWidthButton}
                            onClick={props.handleAddGuests}
                            disabled = {!props.newGuests}
                        >Add Guests</Button>
                    </Grid>


                </Grid>


            </Paper>
        </div>
    );
};

export default AddForm;

