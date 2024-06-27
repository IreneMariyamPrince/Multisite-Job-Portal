/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { BASE_URL } from './Api';

const autheticationApi = {
  async login(formData) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      return responseData; // Return the response data
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${BASE_URL}/password/reset?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      const responseData = await response.json();
      return responseData; // Return the response data
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default autheticationApi;
