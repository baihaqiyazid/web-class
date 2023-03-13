const {
    User, RefreshToken
} = require('../../../models')

module.exports = async (req, res) => {
    const userId = req.body.user_id
    const user = await User.findByPk(userId)

    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "user not found"
        })
    }

    await RefreshToken.destroy({
        where: {user_id: userId}
    })

    return res.json({
        status: 200,
        id: user.Id,
        message: "success logout; token destroyed"
    })
}