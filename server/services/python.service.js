import fs from "fs";
import FormData from "form-data";
import axios from "axios";

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

export const scoreResume = async (resumePath, jobDescription) => {
    const formData = new FormData();

    formData.append("resume", fs.createReadStream(resumePath));
    formData.append("job_description", jobDescription);

    const response = await axios.post(`${PYTHON_API_URL}/score`, formData, {
        headers: formData.getHeaders(),
        timeout: 30000,
    });

    return response.data;
};
