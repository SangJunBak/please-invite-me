import React, {Component} from 'react';

import {
        Grid,
        AppBar,
        Toolbar,
        Typography,
        Button } from '@material-ui/core';
import EnhancedTable from './EnhancedTable.js';
import AddForm from './AddForm.js';
import MD5 from 'md5';
import Fire from '../fire.js';
import 'firebase/database';


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

class Admin extends Component {

    constructor(props){
        super(props);

        this.state={
            newGuests: "",
            page: "guestStatus"
        };

        this.app = Fire;
        this.database = this.app.database().ref('/users/');
    }

    handlePage = (newPage) => {
        this.setState({page: newPage});
    };


    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleAddGuests = () => {

        const newGuests =
            this.state.newGuests
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

        this.setState({
            newGuests: ""
        });

        newGuests.forEach((user)=>{
            const hash = MD5(`hash ${user.user_first_name} ${user.user_last_name}`);
            const url = 'https://PROJECT_NAME.firebaseapp.com/Invitation/'+hash;
            this.database.update({
                [hash]: {
                    url: url,
                    user_first_name: user.user_first_name,
                    user_last_name: user.user_last_name,
                    guest_first_name: user.guest_first_name,
                    guest_last_name: user.guest_last_name,

                    user_stage: "Envelope",
                    guest_mobile: "",
                    guest_status: false,
                    user_email: "",
                    user_dietary: "",
                    user_mobile: "",
                    rsvp_status: false,
                    active: true



                }
            });

        });
    };

    render() {
        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                            Admin Dashboard
                        </Typography>
                        <Button color="inherit" onClick = {()=> this.handlePage("guestStatus")}>Guest Status</Button>
                        <Button color="inherit" onClick = {()=> this.handlePage("guestAdd")}>Add Guests</Button>
                    </Toolbar>
                </AppBar>

                <Grid container justify='center'>
                    {this.state.page === "guestAdd" &&
                        <Grid item xs={11}>
                            <AddForm
                                newGuests={this.state.newGuests}
                                handleInput={this.handleInput}
                                handleAddGuests={this.handleAddGuests}
                            />
                        </Grid>
                    }
                    {this.state.page === "guestStatus" &&
                        <Grid item xs={12}>
                            <EnhancedTable/>
                        </Grid>
                    }

                </Grid>
            </React.Fragment>
        );
    }
}



export default Admin;
