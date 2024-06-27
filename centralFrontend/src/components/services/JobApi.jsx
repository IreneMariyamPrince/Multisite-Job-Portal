/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import { BASE_URL } from './Api';

const jobApi = {
  async register(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/jobvacancy/register`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getAllJobs(page, pageSize) {
    try {
      const response = await axios.get(`${BASE_URL}/jobvacancy?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async jobDelete(formData) {
    console.log(formData);
    try {
      const response = await axios.delete(`${BASE_URL}/jobvacancy/delete`, {
        data: formData, // Pass formData directly here
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default jobApi;
