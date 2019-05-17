import Fire from "../fire";

export const putUser = (userId, req = {}) => {
    const userRef = Fire.database().ref('/users/'+userId);
    console.log(userId);
    return userRef.update(req);
};