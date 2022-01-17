const http = require("http");
require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLauncheData } = require("./models/launches.model");
const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://blog_project:Vja6yEDDZfXyAcXk@cluster0.n53kq.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

async function startSever() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLauncheData();

  server.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
  });
}

startSever();
