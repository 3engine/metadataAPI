const express = require('express');
const tokenRoutes = require('./routes/tokenRoutes');

const app = express();
const PORT = 3000;

app.use('/token', tokenRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
