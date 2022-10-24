const {RefreshToken} = require("../../../models");

module.exports = async (user_id) => {
    const refreshToken = await RefreshToken.findOne({
        where: {
            user_id: user_id
        }
    }) 

    if (refreshToken) {
        return false;
    }

    return refreshToken
}