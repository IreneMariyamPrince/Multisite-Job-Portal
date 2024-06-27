/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import { BASE_URL } from './Api';

const dashboardApi = {
  async dashboardData() {
    try {
      const response = await axios.get(`${BASE_URL}/adminDashboard`);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default dashboardApi;
