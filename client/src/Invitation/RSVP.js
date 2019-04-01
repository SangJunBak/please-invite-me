import React from 'react';
import './Form.css'
/*
guest
guest_mobile:
    guest_status:
        rsvp_status:
            user_email:
                user_first_name:
                    user_id:
                        user_last_name:
                            user_mobile:
                                user_stage:
                                    user_url:
                                    */
const RSVP = (props) => {
    return (
        <div className="RSVP">
            <div className="card-form">
                <form className="signup">
                    <div className="form-title">RSVP</div>
                    <div className="form-body">
                        <div className="row header">
                            <h2>
                                Personal Information
                            </h2>
                        </div>
                        <div className="rule"></div>
                        <br/>
                        <div className="row">
                            <input
                                name="user_email"
                                value={props.user_email}
                                type="email"
                                placeholder="Email Address*"
                                onChange = {props.handleInputChange}/>
                        </div>
                        <div className="row">
                            <input
                                name = "user_mobile"
                                value={props.user_mobile}
                                type="text"
                                placeholder="Phone Number*"
                                onChange = {props.handleInputChange}/>
                        </div>
                        <div className="row">
                            <textarea
                                name = "user_dietary"
                                value={props.user_dietary}
                                placeholder="Dietary Restrictions/Allergies"
                                onChange = {props.handleInputChange}/>
                        </div>
                        {
                            (props.guest_first_name.trim() !== "" && props.guest_last_name.trim() !== "") && (
                            <div>
                                <div className="checkbox_row">
                                <input
                                    name = "guest_status"
                                    value={props.guest_status}
                                    checked={props.guest_status}
                                    type="checkbox"
                                    className="form-checkbox"
                                    id="check-one"
                                    onChange = {props.handleInputChange}/>
                                <label htmlFor="check-one">Plus One?</label>
                                </div>
                                <br/>
                                {
                                    props.guest_status &&
                                    <div className="row">
                                        <input
                                            name = "guest_mobile"
                                            value={props.guest_mobile}
                                            type="text"
                                            placeholder="Guest's Phone Number"
                                            onChange = {props.handleInputChange}/>
                                    </div>
                                }
                            </div>

                            )
                        }
                    </div>
                    <div className="form-footer">
                        <a onClick={props.RSVPConfirmation}>
                            Confirm
                            <span className="fa fa-thumbs-o-up"></span>
                        </a>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RSVP;
