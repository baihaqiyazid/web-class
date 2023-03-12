const Validator = require('fastest-validator')
const v = new Validator();
const bcrypt = require('bcrypt')
const { User } = require('../../../models')

module.exports = async (req, res) => {
    const schema = {
        email: 'string|empty:false',
        password: 'string|min:8|empty:false',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 400,
            message: validate
        })
    }

    const user = await User.findOne({
        where: {email: req.body.email}
    })

    if (!user){
        return res.status(404).json({
            status: 404,
            message: 'user not found'
        })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch){
        return res.status(400).json({
            status: 400,
            message: 'invalid email or password'
        })
    }
    
    return res.status(200).json({
        status: 200,
        message: 'login success',
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    })
}