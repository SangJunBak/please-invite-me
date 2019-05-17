import Fire from "../fire";

export const putUser = (userId, req = {}) => {
    const userRef = Fire.database().ref('/users/'+userId);
    return userRef.update(req);
};

export const putUsers = (req={}) => {
    const userRef = Fire.database().ref('/users');
    return userRef.update(req);
};

export const postUsers = (newUsers) => {
    const usersRef = Fire.database().ref('/users/');

    newUsers.forEach((user) => {
        const newPostRef = usersRef.push();
        const url = 'https://invite-me-please.firebaseapp.com/Invite/' + newPostRef.key;

        newPostRef.set({
            id: newPostRef.key,
            url: url,
            first_name: user.first_name,
            last_name: user.last_name,
            guest_first_name: user.guest_first_name,
            guest_last_name: user.guest_last_name,
            guest_mobile: "",
            guest_rsvp_status: false,
            email: "",
            dietary: "",
            mobile: "",
            rsvp_status: false,
            active: true
        });
    });
};