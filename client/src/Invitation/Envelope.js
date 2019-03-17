import React from 'react';
import './Invitation.css';
import { CSSTransitionGroup } from 'react-transition-group'

const Envelope = (props) => {

    const guests = () => (props.guest_first_name && props.guest_last_name) ? (`and ${props.guest_first_name} ${props.guest_last_name}`) : "";


    const Envelopes = props.Envelopes.map((val) => (
        <div key = {val} className='Envelope' onClick = {props.handleStage}>
            <h5>To: {props.user_first_name} {props.user_last_name} {guests()}</h5>
        </div>
    ));

    return (
        <CSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {Envelopes}
        </CSSTransitionGroup>
    );
};

export default Envelope;
