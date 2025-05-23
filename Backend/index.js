import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from "cors";
import connectDataBase from "./Database/DataConnection.js";
import AuthRouter from "./Routers/Auth.Route.js";
import tableRoutes from "./Routers/tableRoutes.js"
import orderRoutes from "./Routers/orderRoutes.js"
import roomRoutes from "./Routers/roomRoutes.js"


const app = express();

// Middleware

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", AuthRouter);
app.use('/api/v1/tables', tableRoutes);
app.use("/api/v1/orders", orderRoutes); // Use order routes
app.use('/api/v1/rooms', roomRoutes);

// Database Connection
connectDataBase();

// Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`The Server is Running At PORT : ${PORT}`);
});
