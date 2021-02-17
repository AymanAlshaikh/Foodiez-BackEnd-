//imports
const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const path = require("path");
const dirPath = path.join(__dirname, "media");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/categories", categoryRoutes);
app.use("/media", express.static(dirPath));

app.use((req, res, next) => {
  next({ status: 404, message: "path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { message: "internal server error" || error.message } });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
