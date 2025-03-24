// const express = require('express');
// const router = express.Router();
// const Model = require('../models/modelSchema');
// const QRCode = require('qrcode');

// router.get('/models', async (req, res) => {
//     const models = await Model.find();
//     res.json(models);
// });

// router.get('/generate-qr/:modelName', async (req, res) => {
//     const modelName = req.params.modelName;
//     const qrData = `https://your-frontend-url.com/ar-view/${modelName}`;
//     const qrImage = await QRCode.toDataURL(qrData);
//     res.json({ qrImage });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

router.get('/generate-qr/:modelName', async (req, res) => {
    const modelName = req.params.modelName;
    const qrData = `https://your-frontend-url.com/ar-view/${modelName}`;
    const qrImage = await QRCode.toDataURL(qrData);
    res.json({ qrImage });
});

module.exports = router;
