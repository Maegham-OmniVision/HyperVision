// const express = require('express');
// const mongoose = require('mongoose');
// const modelRoutes = require('./routes/modelRoutes');
// const path = require('path');

// const app = express();
// const PORT = 8080;

// mongoose.connect('mongodb://localhost:27017/3dModelsDB')
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => console.log(err));

// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/hello', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'indexed.html'));
// });
// app.use('/api', modelRoutes);

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const modelRoutes = require('./routes/modelRoutes');

const app = express();
const PORT = 8080;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/3dModelsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve 'indexed.html' at '/hello'
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'indexed.html'));
});

app.get('/slider', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'slider.html'));
});

// API routes
app.use('/api', modelRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
