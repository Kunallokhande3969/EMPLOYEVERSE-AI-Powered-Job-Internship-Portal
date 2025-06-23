const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLICKEY_IMAGEKIT,
  privateKey: process.env.PRIVATEKEY_IMAGEKIT,
  urlEndpoint: process.env.URLENDPOINT_IMAGEKIT,
});

module.exports = imagekit;