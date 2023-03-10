const base64Img = require('base64-img');
const express = require('express');
const isBase64 = require('is-base64');
const router = express.Router();

const {Media} = require('../models')
const fs = require('fs')

// GET list of images
router.get('/', async (req, res) => {
  const media = await Media.findAll({
    attributes: ['id', 'image']
  });

  const mapperMedia = media.map((n) => {
    n.image = `${req.get('host')}/${n.image}`;
    return n
  })

  return res.json({
    status: "success",
    data: mapperMedia
  })
})


/* POST image. */
router.post('/', function(req, res, next) {
  const image = req.body.image;

  if (!isBase64(image, {mimeRequired: true})){
    return res.status(400).json({ status: "error",
                                  message: "invalid base64"});
  }

  base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: 400, message: err.message});

    }

    const filename = filepath.split('/').pop();

    const media = await Media.create({image: `images/${filename}`});

    return res.json({
      status: "success",
      data: {
        id: media.id,
        image: `${req.get('host')}/images/${filename}`
      }
    });
  })
});

// DELETE Image by Id
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const media = await Media.findByPk(id);

  if (!media) {
    return res.status(404).json({status: 404, message: "media not found"})
  }

  fs.unlink(`./public/${media.image}`, async (err) => {
    if (err){
      return res.status(400).json({status: 400, message: err.message})
    }
    await media.destroy();

    return res.json({
      status: "succes",
      data: "image deleted"
    });
  })
})

// GET image by id
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const media = await Media.findByPk(id, {
    attributes: ['id', "image"]
  })

  if (!media) {
    return res.status(404).json({status: 404, message: "media not found"})
  }

  return res.json({
    status: "success",
    data: media
  })

})

module.exports = router;
