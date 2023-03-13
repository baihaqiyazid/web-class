const { User } = require('../../../models')

module.exports = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'avatar', 'role', 'profession']
    })
    
    if (!user){
        return res.status(404).json({
            status: 404,
            message: "user not found"
        })
    }

    return res.status(200).json({
        status: 200,
        data: user
    })
}