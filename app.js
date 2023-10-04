const express = require('express');
const tokenRoutes = require('./routes/tokenRoutes');

const app = express();
const PORT = 3000;

app.use('/token', tokenRoutes);

app.get("/", (req, res) => {
    const message = { message: "Request not found" };
    res.status(404).json( message );
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
