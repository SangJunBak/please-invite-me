import React, {useState, useEffect} from 'react';
import Envelope from './Envelope';
import Letter from './Letter';
import Details from './Details';
import Fire from '../fire.js';
import 'firebase/database';
import './Invitation.css'

const database = Fire.database();

function Invitation (props) {
    const [input, changeInput] = useState({
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
        hash: props.location.pathname.split('Invitation').pop()
    });
    useEffect(
        () => {
            const {hash} = input;

            database.ref('/users/'+hash+'/active').on('value', (isActive) => {
                if(isActive.val()){
                    database.ref('/users/'+hash).on('child_added', snap => {

                        if(snap.key === "user_stage"){
                            const new_user_stage = snap.val()+'s';
                            changeInput({...input, [new_user_stage]: [""]})

                        }
                        changeInput({...input, [snap.key]: snap.val()})
                    });
                }
            });
        }, []
    );

    useEffect(() => {
        setTimeout( () => {
            changeInput({
                ...input,
                user_stage: 'Letter',
                Letters: ['']
            });
        }, 500);
    }, [input.Envelopes]);

    useEffect(() => {
        setTimeout( () => {
            changeInput({
                ...input,
                user_stage: 'Details',
                rsvp_status: true,
                Details: ['']
            });
            database.ref('/users/'+input.hash).update({
                user_stage: "Detail",
                guest_mobile: input.guest_mobile,
                guest_status: input.guest_status,
                user_email: input.user_email,
                user_dietary: input.user_dietary,
                user_mobile: input.user_mobile,
                rsvp_status: true
            });

        }, 500);
    }, [input.Letters]);

    function handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        changeInput({...input, [name]: value})

    }

    function envelopeToInvitation() {
        changeInput({...input, Envelopes: []});
    }

    function invitationToDetails() {
        changeInput({...input, Letters: []});
    }

    return (
        <div className="Invitation">
            <Envelope
                Envelopes = {input.Envelopes}
                user_first_name = {input.user_first_name}
                user_last_name = {input.user_last_name}
                guest_first_name = {input.guest_first_name}
                guest_last_name = {input.guest_last_name}
                handleStage ={envelopeToInvitation}
            />
            <Letter
                Letters = {input.Letters}
                guest_first_name = {input.guest_first_name}
                guest_last_name = {input.guest_last_name}
                guest_mobile = {input.guest_mobile}
                guest_status = {input.guest_status}
                user_email = {input.user_email}
                user_mobile = {input.user_mobile}
                user_dietary = {input.user_dietary}
                handleStage ={invitationToDetails}
                handleInputChange = {handleInputChange} />
            <Details
                Details = {input.Details}
            />
        </div>
    );
}

export default Invitation;
