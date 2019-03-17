import React from 'react';
import FlowerImage from './flowers.png';
import { CSSTransitionGroup } from 'react-transition-group'

const Details = (props) => {

    const renderDetails = props.Details.map( (val) => (
        <div className='Details-Container' key={val}>
            <h1>O p e n&nbsp;&nbsp;&nbsp;B a r</h1>
            <hr/>
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

            <img src={FlowerImage} className="flowers" alt=""/>
            <div className="details">
                <h3 className="secondary subtitle"><u>Hotel Details</u></h3>

                <p>
                    Best Western Premier C Hotel
                    <br/>
                    1530 Stone Church Rd E, Hamilton
                    <br/>
                    <br/>
                    Call (905) 381-9898 and ask for Ellen and Sangwon's wedding for a discounted price.

                </p>
            </div>

            <div className="schedule">
                <h3 className="secondary subtitle"><u>Schedule</u></h3>
                <p>Ceremony: 4pm-5pm</p>
                <p>Reception: 5pm-1am</p>
            </div>
            <div className="clear"/>
            <div className = "footer small secondary">
                For any information changes or inquiries, please contact Sangwon.bak@gmail.com
            </div>
        </div>
    ));

    return (
        <CSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {renderDetails}
        </CSSTransitionGroup>
    );
};

export default Details;
