const apiAdaptor = require('../../api-adaptor')
const { URL_SERVICE_USER } = process.env
const api = apiAdaptor(URL_SERVICE_USER)

module.exports = async (req, res) => {
    try {
        const register = await api.post('/users/register', req.body)
        return res.status(200).json(register.data)

    } catch (error) {
        if (error.code == 'ECONNREFUSED') {
            return res.status(500).json({ status: 500, message: "service unavailable" })
        }

        const { status, data } = error.response;
        return res.status(status).json(data)
    }
}