import React, {useState, useEffect} from 'react';
import './Invitation.css';
import RSVP from './RSVP';
import Modal from 'react-modal';
import { CSSTransitionGroup } from 'react-transition-group'

Modal.setAppElement('#root');

function Letter(props) {
    const [isModal, setIsModal] = useState(false);

    function openModal() {
        setIsModal(true);
    }

    function closeModal() {
        setIsModal(true);
    }

    function RSVPConfirmation() {
        closeModal();
        props.handleStage();
    }

    const Letters = props.Letters.map((val) => (
        <div key = {val} className='Letter-Container'>
            <div className="bottomHalf">
                <p className="primary greeting small">Help Us Celebrate</p>
                <p className="primary title big">
                    SangWon & SooMin's
                    <br/>
                    Wedding
                </p>
                <p className="secondary time small">
                    Saturday, March 23rd, 2019
                    <br/>
                    4pm - 1am
                </p>
                <p className="primary address small">
                    Carmen’s Banquet Centre
                    <br/>
                    1520 Stone Church Rd E.
                    <br/>
                    Hamilton, ON
                </p>
                <button className="button" onClick={openModal}>RSVP</button>
            </div>
        </div>
    ));

    return (
        <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={900}
            transitionLeaveTimeout={500}
        >
            <Modal
                isOpen={isModal}
                onRequestClose={closeModal}
                className="modal"
            >
                <RSVP
                    handleInputChange = {props.handleInputChange}
                    RSVPConfirmation = {RSVPConfirmation}
                    guest_first_name = {props.guest_first_name}
                    guest_last_name = {props.guest_last_name}
                    guest_mobile = {props.guest_mobile}
                    guest_status = {props.guest_status}
                    user_email = {props.user_email}
                    user_mobile = {props.user_mobile}
                    user_dietary = {props.user_dietary}/>
            </Modal>
            {Letters}
        </CSSTransitionGroup>
    );
}
export default Letter;
