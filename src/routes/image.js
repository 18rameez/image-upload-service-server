const router = require("express").Router()
const imageController = require("../controller/imageController")
const {imageUpload} = require('../middleware/imageUpload')
const {imageResize} = require("../middleware/imageResize")


router.post('/upload',imageUpload.single('upload_image'), imageResize, imageController.uploadImage)
router.get('/:imageName', imageController.getImage)
router.post('/getAll', imageController.getAllImages)

module.exports = router;