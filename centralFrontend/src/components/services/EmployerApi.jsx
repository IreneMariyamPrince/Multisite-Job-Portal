/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import { BASE_URL } from './Api';

const employerApi = {
  async register(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/employer/register`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getAllEmployers(page, pageSize, searchQuery, filterStatus, filterDate) {
    try {
      const response = await axios.get(
        `${BASE_URL}/employers?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&filterOption=${filterStatus}&orderByDate=${filterDate}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async employerDelete(formData) {
    console.log(formData);
    try {
      const response = await axios.delete(`${BASE_URL}/employer/delete`, {
        data: formData, // Pass formData directly here
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default employerApi;
