import React from 'react';
import './Invitation.css';
import RSVP from './RSVP';
import Modal from 'react-modal';
import { CSSTransitionGroup } from 'react-transition-group'

Modal.setAppElement('#root');

class Letter extends React.Component {


    state = {
        modalIsOpen: false
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
    };

    afterOpenModal = () => {
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    RSVPConfirmation = () => {
        this.closeModal();
        this.props.handleStage();
    };

render() {

        const Letters = this.props.Letters.map((val) => (
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
                    <button className="button" onClick={this.openModal}>RSVP</button>
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
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    className="modal"
                >
                    <RSVP
                        handleInputChange = {this.props.handleInputChange}
                        RSVPConfirmation = {this.RSVPConfirmation}
                        guest_first_name = {this.props.guest_first_name}
                        guest_last_name = {this.props.guest_last_name}
                        guest_mobile = {this.props.guest_mobile}
                        guest_status = {this.props.guest_status}
                        user_email = {this.props.user_email}
                        user_mobile = {this.props.user_mobile}
                        user_dietary = {this.props.user_dietary}/>
                </Modal>
                {Letters}
            </CSSTransitionGroup>
        );
    }
}

export default Letter;
