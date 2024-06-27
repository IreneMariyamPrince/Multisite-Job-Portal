/* eslint-disable no-undef */
import axios from 'axios';
import { BASE_URL } from './Api';

const exportApi = {
  async exportData({
    fileName,
    baseUrl,
    searchQuery,
    filterStatus,
    filterDate,
    filterTheme,
    qualificationId,
    specializationId,
  }) {
    try {
      const response = await axios.post(
        `${BASE_URL}/excel/export?&export=${'excel'}&route=${baseUrl}&searchQuery=${searchQuery}&filterOption=${filterStatus}&orderByDate=${filterDate}&themeFilter=${filterTheme}&qualification=${qualificationId}, &specialization=${specializationId}`,
        null,
        {
          responseType: 'blob',
        }
      );
      console.log(response);

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return blob;
    } catch (error) {
      console.error(error);
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default exportApi;
