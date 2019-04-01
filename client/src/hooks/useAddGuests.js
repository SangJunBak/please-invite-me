import React from 'react';
import MD5 from "md5";
import Fire from '../fire.js';
import 'firebase/database';
const database = Fire.database().ref('/users/');

export default function useAddGuests(newGuests) {
    newGuests.forEach((user) => {
        const hash = MD5(`hash ${user.user_first_name} ${user.user_last_name}`);
        const url = 'https://invite-me-please.firebaseapp.com/Invitation/' + hash;
        database.update({
            [hash]: {
                url: url,
                user_first_name: user.user_first_name,
                user_last_name: user.user_last_name,
                guest_first_name: user.guest_first_name,
                guest_last_name: user.guest_last_name,

                user_stage: "Envelope",
                guest_mobile: "",
                guest_status: false,
                user_email: "",
                user_dietary: "",
                user_mobile: "",
                rsvp_status: false,
                active: true
            }
        });
    });
}
