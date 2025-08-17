const pdfParse = require('pdf-parse');

const parseResume = async (pdfBuffer) => {
  try {
    const { text } = await pdfParse(pdfBuffer);
    return { success: true, text };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { parseResume };
