const Validator = require('fastest-validator')
const v = new Validator();
const bcrypt = require('bcrypt')
const { User } = require('../../../models')

module.exports = async (req, res) => {
    let schema = {
        name: 'string|empty:false',
        email: 'string|empty:false',
        password: 'string|min:8|optional',
        profession: 'string|optional',
        avatar: 'string|optional',
    }

    let password = req.body.password

    // check password
    if (password){
        schema.validate_password = 'string|min:8|empty:false'
        
         // Check Password
        if (req.body.validate_password !== password){
            return res.status(400).json({
                status: 400,
                message: "invalid validate password"
            })
        }
        password = await bcrypt.hash(req.body.password,10)
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 400,
            message: validate
        })
    }
    
    const user = await User.findByPk(req.params.id);

    // Check user
    if (!user){
        return res.status(404).json({
            status: 404,
            message: 'user not found'
        })
    }
    
    const {
        name, profession, avatar, email
    } = req.body

    if (!password){
        password = user.password
    }

    // Check email
    if (email){
        const isEmailExist = await User.findOne({
            where: {email}
        })

        if (isEmailExist && email !== user.email) {
            return res.status(409).json({
                status: 409,
                message: "email already exist"
            })
        }
    }

    // Update
    await user.update({
        name, 
        email, 
        password, 
        profession, 
        avatar
    })
    
    return res.status(200).json({
        status: 200,
        message: 'success updated user',
        data: {
            id: user.id
        }
    })
}