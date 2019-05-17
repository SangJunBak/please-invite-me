import React from 'react';
import PropTypes from 'prop-types';
import InviteGreeting from "../InviteGreeting";
import {Link} from 'react-router-dom';
import styles from './InviteLetter.module.css';

// import './Invitation.css';

const InviteLetter = (props) => (
    <Link to={props.INVITE_URL+'/Greeting'}>
        <div className={styles.Envelope}>
            <h5>
                To: {props.first_name} {props.last_name}
                {
                    (props.guest_first_name && props.guest_last_name) ?
                        ` and ${props.guest_first_name} ${props.guest_last_name}` :
                        ''
                }
            </h5>
        </div>
    </Link>
);

InviteLetter.propTypes = {
    guest_first_name: PropTypes.string,
    guest_last_name: PropTypes.string,
    INVITE_URL: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
};

InviteLetter.defaultProps = {
    guest_first_name: '',
    guest_last_name: '',
    INVITE_URL: '',
    first_name: '',
    last_name: '',
};

export default InviteLetter;