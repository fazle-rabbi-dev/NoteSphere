require("dotenv").config();
const { connectDB } = require("./lib/db.js");
const { app, fetchDataAndCache } = require("./app.js");
const PORT = 5000;

app.listen(PORT, async err => {
  if (!err) {
    await connectDB();
    await fetchDataAndCache();
    console.log(`🎉 Server started at: http://localhost:${PORT}`);
  }
});
