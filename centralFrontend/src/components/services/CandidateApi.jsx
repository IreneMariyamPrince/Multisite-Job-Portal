/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import { BASE_URL } from './Api';

axios.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const candidateApi = {
  async register(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/candidate/register`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getAllCandidates(page, pageSize, qualificationId, specializationId, searchQuery) {
    try {
      const response = await axios.get(
        `${BASE_URL}/candidateList?page=${page}&pageSize=${pageSize}&qualification=${qualificationId}&specialization=${specializationId}&searchQuery=${searchQuery}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getQualifications() {
    try {
      const response = await axios.get(`${BASE_URL}/qualification`);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getCandidate() {
    try {
      const response = await axios.get(`${BASE_URL}/candidate`);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async dashboardData() {
    try {
      const response = await axios.get(`${BASE_URL}/candidate/dashboard`);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getSpecializations(eduQualificationId) {
    console.log(eduQualificationId, 'specialization');
    try {
      const response = await axios.get(
        `${BASE_URL}/specialization/?eduQualificationId=${eduQualificationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async candidateDelete(formData) {
    console.log(formData);
    try {
      const response = await axios.delete(`${BASE_URL}/candidate/delete`, {
        data: formData, // Pass formData directly here
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default candidateApi;
