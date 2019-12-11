import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";
import itemsController from "../routes/items.controller";
import reservationController from "../routes/reservation.controller";

let morgan = require("morgan");

// Put dotenv in use before importing controllers
dotenv.config();

// Import controllers

// Create the express application
const app = express();

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
// Assign controllers to routes
/*app.use("/api/items", itemsController);
app.use("/api/users", usersController);*/
app.use("/items", itemsController);
app.use("/reservations", reservationController);

// Declare the path to frontend's static assets
app.use(express.static(path.resolve("..", "frontend", "build")));

// Intercept requests to return the frontend's static entry point
app.get("*", (_, response) => {
  response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

export default app;
