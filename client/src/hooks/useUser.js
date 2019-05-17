import React, {useState, useEffect} from 'react';
import Fire from '../fire.js';

const useUser = (userId = false) => {
    if (!userId) { return null; }
    const userRef = Fire.database().ref('/users/'+userId);
    const [user, setUser] = useState(null);

    const handleUser = (e) => {
        const {target} = e;
        const {type, checked} = target;
        const value = type === 'checkbox' ? checked : target.value;
        const {name} = target;
        setUser({
           ...user,
           [name]: value
        });
    };

    useEffect(() => {
        userRef.on('value', snap => {
            const val = snap.val();
            (!!val.active) ? setUser(val) : setUser(null);
        });

        return () => {
            userRef.off();
        };
    }, [userId]);

    return {user, handleUser};
};

export default useUser;