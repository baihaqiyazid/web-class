const apiAdaptor = require('../../api-adaptor')

const {
    URL_SERVICE_MEDIA
} = process.env

const api = apiAdaptor(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
    try {
        const media = await api.get("/media")
        return res.json(media.data)
    } catch (error) {
        if (error.code == 'ECONNREFUSED') {
            return res.status(500).json({status:500, message:"service unavailable"})
        }

        const {status, data} = error.response;
        return res.status(status).json(data)
        
    }
}