const express = require("express");
const { mongodb } = require("./config/db");
const metadataRoutes = require("./routes/metadataRoutes");

const app = express();
const PORT = 3000;

app.use(mongodb);
app.use("/metadata", metadataRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
