const {RefreshToken} = require('../../../models')

module.exports = async (req, res) => {
    const tokenQuery = req.query.refresh_token
    const userByToken = await RefreshToken.findOne({
        where: {token: tokenQuery},
        attributes: ["id", "user_id", "token"]
    })

    if (!userByToken) {
        return res.status(404).json({
            status: 404,
            message: "invalid token"
        })
    }

    return res.json({
        status: 200,
        message: "valid token",
        data: userByToken
    })
}