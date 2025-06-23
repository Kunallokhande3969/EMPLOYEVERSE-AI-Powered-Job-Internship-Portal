const uploadResume = async (req, res) => {
  try {
    if (!req.files?.resume) {
      return res.status(400).json({ error: "PDF file missing" });
    }

    const pdfBuffer = req.files.resume.data;
    const { text: resumeText } = await parseResume(pdfBuffer);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resumeText: resumeText.substring(0, 500) + "...",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeedback = async (req, res) => {
  try {
    const { resumeText, jobTitle } = req.body;

    if (!resumeText || !jobTitle) {
      return res.status(400).json({ error: "Resume text and job title are required" });
    }

    const feedback = await analyzeResume(resumeText, jobTitle);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadResume, getFeedback };