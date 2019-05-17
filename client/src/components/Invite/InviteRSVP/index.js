import React from 'react';
import PropTypes from 'prop-types';

import styles from './InviteRSVP.module.css';

const formData = {
    email: {
        name: 'email',
        type: 'email',
        placeholder: 'Email Address*'
    },
    mobile: {
        name: 'mobile',
        placeholder: 'Phone Number*'
    },
    dietary: {
        name: 'dietary',
        placeholder: 'Dietary Restrictions/Allergies'
    },
    guest_rsvp_status: {
        name: 'guest_rsvp_status'
    },
    guest_mobile: {
        name: 'guest_mobile',
        placeholder: 'Guest Phone Number*'
    }
};

const TextInput = (props) => (
    <div className={styles.row}>
        <input
            name={props.name}
            className={styles.textInput}
            value={props.value}
            type={formData[props.name].type ? formData[props.name].type : 'text'}
            placeholder={formData[props.name].placeholder}
            onChange = {props.onChange}
        />
    </div>
);

const TextAreaInput = (props) => (
    <div className={styles.row}>
        <textarea
            name={props.name}
            value={props.value}
            className={styles.textAreaInput}
            placeholder={formData[props.name].placeholder}
            onChange = {props.onChange}
        />
    </div>
);

const CheckboxInput = (props) => (
    <div className={styles.checkboxRow}>
        <input
            className={styles.formCheckbox}
            name = {props.name}
            id={props.name}
            type='checkbox'
            checked={props.value}
            onChange={props.onChange}
        />
        <label htmlFor={props.name}>{props.label}</label>
    </div>
);

const InviteRSVP = (props) => (
    <div className={styles.cardForm}>
        <form className={styles.signup}>
            <div className={styles.formTitle}>RSVP</div>
            <div className={styles.formBody}>
                <div className={styles.header}>
                    <h2>
                        Personal Information
                    </h2>
                </div>
                <div className={styles.rule}/>
                <br/>
                {['email', 'mobile'].map((val) => (
                    <TextInput
                        key={val}
                        name={val}
                        value={props[val]}
                        onChange={props.handleUser}
                    />
                ))}
                <TextAreaInput
                    name='dietary'
                    value={props.dietary}
                    onChange={props.handleUser}
                />

                {(props.guest_first_name !== '' && props.guest_last_name !== '') && (
                    <div>
                        <CheckboxInput
                            name = 'guest_rsvp_status'
                            value={props.guest_rsvp_status}
                            label='Plus One?'
                            onChange={props.handleUser}
                        />
                        <br/>
                        {
                            props.guest_rsvp_status &&
                            <TextInput
                                name='guest_mobile'
                                value={props.guest_mobile}
                                onChange={props.handleUser}
                            />
                        }
                    </div>
                    )
                }
            </div>
            <div className={styles.formFooter}>
                <a
                    className={styles.confirmButton}
                    onClick={() => props.handleRSVP()}
                >
                    Confirm
                </a>
            </div>
        </form>
    </div>
);

InviteRSVP.propTypes = {
    guest_first_name: PropTypes.string,
    guest_last_name: PropTypes.string,
    guest_mobile: PropTypes.string,
    guest_rsvp_status: PropTypes.bool,
    handleRSVP: PropTypes.func,
    handleUser: PropTypes.func,
    dietary: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string
};

InviteRSVP.defaultProps = {
    guest_first_name: '',
    guest_last_name: '',
    guest_mobile: '',
    guest_rsvp_status: false,
    handleRSVP: () => {},
    handleUser: () => {},
    dietary: '',
    email: '',
    mobile: ''
};

export default InviteRSVP;
