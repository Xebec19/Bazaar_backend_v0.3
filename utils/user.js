import BazaarUser from "../models/bazaarUsers.js";
export const findUserByToken = async (token) => {
    token = token.split(' ');
    token = token[1];
    return await BazaarUser.findOne({token:token});
}