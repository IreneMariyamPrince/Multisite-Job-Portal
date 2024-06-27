/* eslint-disable no-undef */
const ExcelJS = require('exceljs');

const exportToExcel = async (data, headers, sheetName) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Add headers to the worksheet
  worksheet.addRow(headers);

  // Add data rows to the worksheet
  data.forEach(row => {
    worksheet.addRow(row);
  });

  // Generate Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

module.exports = {
  exportToExcel,
};
