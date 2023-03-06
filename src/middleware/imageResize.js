const path = require("path");
const sharp = require("sharp");

function imageResize(req, res, next) {
  sharp.cache(false);
  if (!req.file) {
    return next();
  }

  const sizes = [200, 400, 800];

  Promise.all(
    sizes.map((size) => {
      const ext = path.extname(req.newFileName);
      const fileName = path.parse(req.newFileName).name;
      return sharp(req.file.path)
        .resize(size)
        .toFile(
          path.join(__dirname, `../../uploads/${fileName}-${size}${ext}`)
        );
    })
  )
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
}

exports.imageResize = imageResize;
