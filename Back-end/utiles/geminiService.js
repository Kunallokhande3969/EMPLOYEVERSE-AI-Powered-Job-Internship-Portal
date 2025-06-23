const { GoogleGenerativeAI } = require("@google/generative-ai");
const ErrorHandler = require("../utiles/ErorrHandler");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeResumeWithGemini(resumeText, jobDescription) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this resume for the job role: ${jobDescription}. 
    Provide detailed feedback including:
    1. Skills match percentage (0-100%)
    2. Missing keywords from job description
    3. Strengths in the resume
    4. Specific improvement suggestions
    5. Overall recommendation
    6. Use bullet points for clarity
    7. Use simple language
    8.Make it short and concise
    Resume: ${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new ErrorHandler("Failed to analyze resume", 500);
  }
}

module.exports = { analyzeResumeWithGemini };