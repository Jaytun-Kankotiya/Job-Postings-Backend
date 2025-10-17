import jobModel from "../models/JobModel.js"


const validJobTypes = ["Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"]

const postJob = async (req, res) => {
    try {
        let {title, companyName, location, salary, jobType, description, qualifications} = req.body

        if(!title?.trim()){
            return res.status(400).json({success: false, message: "Invalid Input: title is required"})
        }

        if(!companyName?.trim()){
            return res.status(400).json({success: false, message: "Invalid Input: companyName is required"})
        }

        if(!location?.trim()){
            return res.status(400).json({success: false, message: "Invalid Input: location is required"})
        }

        if(!salary || isNaN(salary)){
            return res.status(400).json({success: false, message: "Invalid Input: salary is required"})
        }

        if(!jobType || !validJobTypes.includes(jobType)){
            return res.status(400).json({success: false, message: "Invalid Input: jobType is required"})
        }

        if(!description?.trim()){
            return res.status(400).json({success: false, message: "Invalid Input: description is required"})
        }

        if(!qualifications?.trim()){
            return res.status(400).json({success: false, message: "Invalid Input: qualifications is required"})
        }

        salary = Number(salary)

        const newJob = new jobModel({
            title,
            companyName,
            location,
            salary,
            jobType,
            description,
            qualifications
        })
        const savedJob = await newJob.save()
        return res.status(200).json({success: true, message: "New Job added", data: savedJob})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const fetchAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find()
        if(jobs.length === 0){
            return res.status(404).json({success: false, message: "Error fetching jobs detail"})
        }
        return res.status(200).json({success: true, data: jobs})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const fetchJobById = async (req, res) => {
    try {
        const {id} = req.params
        const job = await jobModel.findById(id)
        if(!job){
            return res.status(404).json({success: false, message: "Error fetching job details"})
        }
        return res.status(200).json({success: true, data: job})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const deleteJob = async (req, res) => {
    try {
        const findJob = await jobModel.findByIdAndDelete(req.params.id)
        if(!findJob){
            return res.status(404).json({success: false, message: "Error deleting job"})
        }
        return res.status(200).json({success: true, message: "Job data deleted successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export {postJob, fetchAllJobs, fetchJobById, deleteJob}