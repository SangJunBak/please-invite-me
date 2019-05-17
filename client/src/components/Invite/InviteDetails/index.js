import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './InviteDetails.module.css';
import FlowerImage from '../../../assets/images/flowers.png';
import PropTypes from "prop-types";

const InviteDetails = (props) => (
    <div className={styles.detailsContainer}>
        <NavLink
            className={styles.backButton}
            to={props.INVITE_URL + '/Greeting'}>
            Back
        </NavLink>
        <h1 className={styles.detailsHeader}>O p e n&nbsp;&nbsp;&nbsp;B a r</h1>
        <hr/>
        <div className={styles.time}>
            Saturday, March 23rd, 2019
            <br/>
            4pm - 1am
        </div>
        <div className={styles.address}>
            Carmen’s Banquet Centre¡
            <br/>
            1520 Stone Church Rd E.
            <br/>
            Hamilton, ON
        </div>

        <img src={FlowerImage} className={styles.flowers} alt='flowers'/>
        <div className={styles.details}>
            <div className={styles.hotelDetails}>
                <h3 className={styles.hotelTitle}><u>Hotel Details</u></h3>
                <p>
                    Best Western Premier C Hotel
                    <br/>
                    1530 Stone Church Rd E, Hamilton
                    <br/>
                    <br/>
                    Call (905) 381-9898 and ask for Ellen and Sangwon's wedding for a discounted price.

                </p>
            </div>

            <div className={styles.scheduleDetails}>
                <h3 className={styles.scheduleTitle}><u>Schedule</u></h3>
                <p>Ceremony: 4pm-5pm</p>
                <p>Reception: 5pm-1am</p>
            </div>
        </div>
        <div className={styles.footer}>
            For any information changes or inquiries, please contact Sangwon.bak@gmail.com
        </div>
    </div>
);

InviteDetails.propTypes = {
    INVITE_URL: PropTypes.string
};

InviteDetails.defaultProps = {
    INVITE_URL: ''
};

export default InviteDetails;
