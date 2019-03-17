import React, {Component} from 'react';
import Envelope from './Envelope';
import Letter from './Letter';
import Details from './Details';
import Fire from '../fire.js';
import 'firebase/database';
import './Invitation.css'

class Invitation extends Component {

    constructor(props){
        super(props);
        this.state = {
            guest_first_name: "",
            guest_last_name: "",
            guest_mobile: "",
            guest_status: false,
            rsvp_status: false,
            user_email: "",
            user_first_name: "",
            user_last_name: "",
            user_mobile: "",
            user_stage: "",
            user_dietary: "",
            url: "",
            Envelopes: [],
            Letters: [],
            Details: [],
            hash: this.props.location.pathname.split('Invitation').pop()
        };

        this.database = Fire.database();
    }

    componentDidMount(){
        const {hash} = this.state;

        this.database.ref('/users/'+hash+'/active').on('value', (isActive) => {
            if(isActive.val()){
                this.database.ref('/users/'+hash).on('child_added', snap => {

                    if(snap.key === "user_stage"){
                        const new_user_stage = snap.val()+'s';
                        this.setState({
                            [new_user_stage]: [""]
                        });
                    }
                    this.setState({
                        [snap.key]: snap.val()
                    });
                });
            }
        });

    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };
    
    envelopeToInvitation = () => {

        this.setState({
            Envelopes: [],
        }, ()=>{
            const new_user_stage = "Letter";
            setTimeout( () => {
                this.setState({
                    user_stage: new_user_stage,
                    Letters: [""]
                });
                // this.database.ref('/users/'+this.state.hash).update({
                //     user_stage: new_user_stage
                // });
            }, 500);
        });
    };

    invitationToDetails = () => {

        this.setState({
            Letters: [],
        }, ()=>{
            setTimeout( () => {
                this.setState({
                    user_stage: "Details",
                    rsvp_status: true,
                    Details: [""]
                });
                this.database.ref('/users/'+this.state.hash).update({
                    user_stage: "Detail",
                    guest_mobile: this.state.guest_mobile,
                    guest_status: this.state.guest_status,
                    user_email: this.state.user_email,
                    user_dietary: this.state.user_dietary,
                    user_mobile: this.state.user_mobile,
                    rsvp_status: true
                });

            }, 500);
        });
    };

    render() {
        return (
            <div className="Invitation">
                <Envelope
                    Envelopes = {this.state.Envelopes}
                    user_first_name = {this.state.user_first_name}
                    user_last_name = {this.state.user_last_name}
                    guest_first_name = {this.state.guest_first_name}
                    guest_last_name = {this.state.guest_last_name}
                    handleStage ={this.envelopeToInvitation}
                />
                <Letter
                    Letters = {this.state.Letters}
                    guest_first_name = {this.state.guest_first_name}
                    guest_last_name = {this.state.guest_last_name}
                    guest_mobile = {this.state.guest_mobile}
                    guest_status = {this.state.guest_status}
                    user_email = {this.state.user_email}
                    user_mobile = {this.state.user_mobile}
                    user_dietary = {this.state.user_dietary}
                    handleStage ={this.invitationToDetails}
                    handleInputChange = {this.handleInputChange} />
                <Details
                    Details = {this.state.Details}
                />
            </div>
        );
    }
}

export default Invitation;
