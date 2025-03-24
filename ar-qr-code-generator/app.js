// const express = require('express');
// const fileUpload = require('express-fileupload');
// const QRCode = require('qrcode');
// const path = require('path');
// const fs = require('fs');
// const http = require('http');


// const app = express();
// const hostname = '0.0.0.0';
// const PORT = 4000;

// // Middleware
// app.use(express.static('public'));
// app.use(fileUpload());
// app.set('view engine', 'ejs');

// // Routes
// app.get('/', (req, res) => {
//     res.render('index', { qrCodeUrl: null });
// });

// app.post('/upload', async (req, res) => {
//     if (!req.files || !req.files.model) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     const model = req.files.model;
//     const uploadPath = path.join(__dirname, 'public', 'uploads', model.name);

//     // Save the GLB file
//     model.mv(uploadPath, async (err) => {
//         if (err) return res.status(500).send(err);

//         // Generate AR viewer link
//         const arViewerLink = `${req.protocol}://${req.get('host')}/ar-viewer?model=${model.name}`;

//         // Generate QR code
//         const qrCodePath = path.join(__dirname, 'public', 'uploads', `${path.parse(model.name).name}-qrcode.png`);
//         await QRCode.toFile(qrCodePath, arViewerLink);

//         // Render the upload form with the QR code
//         res.render('index', { qrCodeUrl: `/uploads/${path.basename(qrCodePath)}` });
//     });
// });

// // AR Viewer Route
// app.get('/ar-viewer', (req, res) => {
//     const modelName = req.query.model;
//     if (!modelName) {
//         return res.status(400).send('Model not specified.');
//     }

//     const modelPath = `/uploads/${modelName}`;
//     const fullModelPath = path.join(__dirname, 'public', modelPath);

//     // Check if the model file exists
//     if (!fs.existsSync(fullModelPath)) {
//         return res.status(404).send('Model not found.');
//     }

//     // Render the AR viewer page
//     res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>AR Viewer</title>
//             <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
//             <style>
//                 body, html {
//                     margin: 0;
//                     padding: 0;
//                     width: 100%;
//                     height: 100%;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     background-color: #f0f0f0;
//                 }
//                 model-viewer {
//                     width: 100%;
//                     height: 100%;
//                 }
//             </style>
//         </head>
//         <body>
//             <model-viewer src="${modelPath}" ar ar-modes="scene-viewer quick-look" camera-controls alt="3D model">
//                 <button slot="ar-button" style="background-color: #000; color: #fff; border: none; padding: 10px; position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);">
//                     View in your space
//                 </button>
//             </model-viewer>
//         </body>
//         </html>
//     `);
// });

// // Start Server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!\n');
//   });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
//   });


const express = require('express');
const fileUpload = require('express-fileupload');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const http = require('http');

const app = express();
const hostname = '0.0.0.0';
const PORT = 4000;

// Middleware
app.use(express.static('public'));
app.use(fileUpload());
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { qrCodeUrl: null });
});

app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.model) {
        return res.status(400).send('No files were uploaded.');
    }

    const model = req.files.model;
    const uploadPath = path.join(__dirname, 'public', 'uploads', model.name);

    // Save the GLB file
    model.mv(uploadPath, async (err) => {
        if (err) return res.status(500).send(err);

        // Generate AR viewer link
        const arViewerLink = `${req.protocol}://${req.get('host')}/ar-viewer?model=${model.name}`;

        // Generate QR code
        const qrCodePath = path.join(__dirname, 'public', 'uploads', `${path.parse(model.name).name}-qrcode.png`);
        await QRCode.toFile(qrCodePath, arViewerLink);

        // Render the upload form with the QR code
        res.render('index', { qrCodeUrl: `/uploads/${path.basename(qrCodePath)}` });
    });
});

// AR Viewer Route
app.get('/ar-viewer', (req, res) => {
    const modelName = req.query.model;
    if (!modelName) {
        return res.status(400).send('Model not specified.');
    }

    const modelPath = `/uploads/${modelName}`;
    const fullModelPath = path.join(__dirname, 'public', modelPath);

    // Check if the model file exists
    if (!fs.existsSync(fullModelPath)) {
        return res.status(404).send('Model not found.');
    }

    // Render the AR viewer page
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AR Viewer</title>
            <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f0f0f0;
                }
                model-viewer {
                    width: 100%;
                    height: 100%;
                }
            </style>
        </head>
        <body>
            <model-viewer src="${modelPath}" ar ar-modes="scene-viewer quick-look" camera-controls alt="3D model">
                <button slot="ar-button" style="background-color: #000; color: #fff; border: none; padding: 10px; position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);">
                    View in your space
                </button>
            </model-viewer>
        </body>
        </html>
    `);
});

// Start the Express server
app.listen(PORT, hostname, () => {
    console.log(`Server is running on http://${hostname}:${PORT}`);
});
