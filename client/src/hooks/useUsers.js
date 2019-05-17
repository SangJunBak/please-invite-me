import React, {useState, useEffect} from 'react';
import Fire from '../fire.js';

const useUsers = () => {
    const usersRef = Fire.database().ref('/users');
    const [users, setUsers] = useState(null);

    useEffect(() => {
        usersRef.on('value', snap => {
            const val = Object.values(snap.val());

            setUsers(val);
        });

        return () => {
            usersRef.off();
        };
    }, []);

    return {users};
};

export default useUsers;