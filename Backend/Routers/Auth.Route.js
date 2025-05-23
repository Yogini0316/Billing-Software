import express from "express";
import { Login } from "../Controllers/User.Controllers.js";


const router = express.Router();


router.post("/login", async (req, res) => {
    try {
      await Login(req, res);
    } catch (error) {
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  });
  




export default router;
