/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import { BASE_URL } from './Api';

const regionApi = {
  async register(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/region/register`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getAllRegion(page, pageSize, searchQuery, filterStatus, filterDate) {
    try {
      const response = await axios.get(
        `${BASE_URL}/regions?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&filterOption=${filterStatus}&orderByDate=${filterDate}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async getWebInfo(page, pageSize, searchQuery, filterStatus, filterDate, filterTheme) {
    try {
      const response = await axios.get(
        `${BASE_URL}/region/webInfo?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&filterOption=${filterStatus}&themeFilter=${filterTheme}&orderByDate=${filterDate}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async webInfoRegister(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/webinfo/register`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async regionDelete(formData) {
    console.log(formData);
    try {
      const response = await axios.delete(`${BASE_URL}/region/delete`, {
        data: formData, // Pass formData directly here
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async regionApprove(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/region/approve`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async declineWebInfo(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/webinfo/decline`, formData);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default regionApi;
