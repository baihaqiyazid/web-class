const bcrypt = require('bcrypt')
const { User } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'string|empty:false',
        password: 'string|min:8',
        profession: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 400,
            message: validate
        })
    }

    const emailIsExist = await User.findOne({
        where: {email: req.body.email}
    })

    if (emailIsExist) {
        return res.status(409).json({
            status: 409,
            messsage: 'email already exist'
        })
    } 

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        profession: req.body.profession,
        role: 'student'
    }

    const createUser = await User.create(data)

    return res.status(200).json({
        status: 200,
        message: 'success created user',
        data: {
            id: createUser.id,
            name: createUser.name,
            email: createUser.email,
            profession: createUser.profession,
            role: createUser.role
        }
    })
}