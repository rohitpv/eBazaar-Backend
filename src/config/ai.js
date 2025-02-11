import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // Securely load the API key from the environment
  dangerouslyAllowBrowser: true,
  baseURL: process.env.OPENROUTER_BASE_URL,

});

export default openai;
