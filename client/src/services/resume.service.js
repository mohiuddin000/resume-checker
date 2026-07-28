import api from "../api/axios";

export const uploadResume = async (formData) => {
    const response = await api.post("/resumes/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getResumes = async (page = 1, limit = 10) => {
    const response = await api.get(`/resumes?page=${page}&limit=${limit}`);

    return response.data;
};

export const getResumeById = async (id) => {
    const response = await api.get(`/resumes/${id}`);

    return response.data;
};

export const deleteResume = async (id) => {
    const response = await api.delete(`/resumes/${id}`);

    return response.data;
};
