import React from 'react';
import useUser from '../../hooks/useUser';
import {Route, Switch, Redirect} from 'react-router-dom';
import InviteDetails from './InviteDetails';
import InviteLetter from './InviteLetter';
import InviteGreeting from './InviteGreeting';

import styles from './Invite.module.css';

const Invite = (props) => {
    const {url, params} = props.match;
    const {userId} = params;
    const {user, handleUser} = useUser(userId);
    const {
        dietary,
        email,
        first_name,
        guest_first_name,
        guest_last_name,
        guest_mobile,
        guest_rsvp_status,
        id,
        last_name,
        mobile,
        rsvp_status
    } = user || {};

    return (
        (user === null) ? null :
            <div className={styles.Invite}>
                <Switch>
                    <Route
                        path={url+'/Letter'}
                        render={() => (
                            <InviteLetter
                                first_name = {first_name}
                                guest_first_name = {guest_first_name}
                                guest_last_name = {guest_last_name}
                                INVITE_URL={url}
                                last_name = {last_name}
                            />
                        )}
                    />
                    <Route
                        path={url+'/Details'}
                        render={() => (
                            <InviteDetails INVITE_URL={url}/>
                        )}
                    />
                    <Route
                        path={url+'/Greeting'}
                        render={({history}) => (
                            <InviteGreeting
                                dietary = {dietary}
                                email = {email}
                                guest_first_name = {guest_first_name}
                                guest_last_name = {guest_last_name}
                                guest_mobile = {guest_mobile}
                                guest_rsvp_status = {guest_rsvp_status}
                                handleUser = {handleUser}
                                history={history}
                                id={id}
                                INVITE_URL={url}
                                mobile = {mobile}
                            />
                        )}
                    />
                    {rsvp_status ?
                        <Redirect exact from={url} to={url+'/Details'}/> :
                        <Redirect exact from={url} to={url+'/Letter'}/>
                    }
                </Switch>
            </div>
    );
};

export default Invite;
