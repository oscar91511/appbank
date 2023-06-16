require("dotenv").config();
const app = require("./app");
const { db } = require("./database/config");



db.authenticate()
  .then(() => console.log("Database autenticated! 👌😁"))
  .catch(() => console.log(err));

db.sync()
  .then(() => console.log("Database synced! 😁👌"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ✈️🪁😁`);
});
