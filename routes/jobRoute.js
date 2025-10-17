import express from "express";
import { deleteJob, fetchAllJobs, fetchJobById, postJob } from "../controller/jobController.js";

const jobRouter = express.Router()

jobRouter.post("/", postJob)
jobRouter.get("/", fetchAllJobs)
jobRouter.get("/:id", fetchJobById)
jobRouter.delete("/:id", deleteJob)

export default jobRouter