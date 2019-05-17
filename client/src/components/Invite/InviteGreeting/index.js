import React, {useState} from 'react';
import PropTypes from 'prop-types';
import InviteRSVP from '../InviteRSVP';
import Modal from 'react-modal';
import {putUser} from '../../../utils';

import greetingImage from '../../../assets/images/greeting.png';

import styles from './InviteGreeting.module.css';

Modal.setAppElement('#root');

// Override default modal styles
Modal.defaultStyles.overlay.overflow = 'scroll';
Modal.defaultStyles.content = {};


function InviteGreeting(props) {
    const [isModal, setIsModal] = useState(false);

    const handleRSVP = async () => {
        try {
            const {
                dietary,
                email,
                guest_mobile,
                guest_rsvp_status,
                mobile,
                id,
            } = props;
            await putUser(id, {
                dietary,
                email,
                guest_mobile,
                guest_rsvp_status,
                mobile,
                rsvp_status: true
            });
            const {INVITE_URL, history} = props;
            history.push(INVITE_URL+'/Details');
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <>
            <Modal
                isOpen={isModal}
                onRequestClose={() => setIsModal(false)}
                className={styles.modal}
            >
                <InviteRSVP
                    {...props}
                    handleRSVP={handleRSVP}
                />
            </Modal>
            <div className={styles.letterContainer}>
                <img
                    className={styles.greetingImage}
                    src={greetingImage}
                    alt='Join Us'
                />

                <div className={styles.textContainer}>
                    <div className={styles.header}>
                        <div className={styles.greeting}>Help Us Celebrate</div>
                        <div className={styles.title}>
                            SangWon & SooMin's
                            <br/>
                            Wedding
                        </div>
                    </div>
                    <div>
                        <div className={styles.time}>
                            Saturday, March 23rd, 2019
                            <br/>
                            4pm - 1am
                        </div>
                        <div className={styles.address}>
                            Carmen’s Banquet Centre
                            <br/>
                            1520 Stone Church Rd E.
                            <br/>
                            Hamilton, ON
                        </div>
                    </div>
                    <button className={styles.button} onClick={() => setIsModal(true)}>RSVP</button>
                </div>
            </div>
        </>
    );
}

InviteGreeting.propTypes = {
    dietary: PropTypes.string,
    email: PropTypes.string,
    guest_first_name: PropTypes.string,
    guest_last_name: PropTypes.string,
    guest_mobile: PropTypes.string,
    guest_rsvp_status: PropTypes.bool,
    handleUser: PropTypes.func,
    history: PropTypes.object,
    id: PropTypes.string,
    INVITE_URL: PropTypes.string,
    mobile: PropTypes.string,
};

InviteGreeting.defaultProps = {
    dietary: '',
    email: '',
    guest_first_name: '',
    guest_last_name: '',
    guest_mobile: '',
    guest_rsvp_status: false,
    handleUser: () => {},
    history: {},
    id: '',
    INVITE_URL: '',
    mobile: '',
};

export default InviteGreeting;
