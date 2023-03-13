const { User } = require('../../../models')

module.exports = async (req, res) => {
    const user = await User.findAll({
        attributes: ['id', 'name', 'email', 'avatar', 'role', 'profession']
    })

    return res.status(200).json({
        status: 200,
        data: user
    })
}