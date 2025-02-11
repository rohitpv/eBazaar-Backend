import openai from "../config/ai.js";
import mongoose from "mongoose";

// @desc    Get OpenAI completion
// @route   POST /api/openai
// @access  Public
const getOpenAICompletion = async (req, res) => {
  
  try {
    const { prompt } = req.body;
    const SYSTEM_PROMPT = `
    You are an AI that converts natural language queries into MongoDB filter JSON.
Here is the schema for the "Product" collection in MongoDB:

{
"Handle": "zebra-print-bikini",
"Title": "Zebra Print Bikini",
"Body": "I hear that zebra print swimwear is rather 'in' at the moment, and has been seen on everyone from Cheryl Cole to...actually, she's the only one who I had heard of (What on earth is a Kim Kardashian?? Answers in a postcard please).\n\nClassic black and white zebra print bikini. Just make sure you wear suntan lotion ot you'll be black and white and red all over!! Hahahaha... (I'll get my coat)\n\nOne Size fits all.",
"Vendor": "Docblack",
"Type": "Bikinis",
"Tags": "bikini, black, white, zebra",
"Option1 Name": "Title",
"Option1 Value": "Size Free",
"Option2 Name": "",
"Option2 Value": "",
"Option3 Name": "",
"Option3 Value": "",
"Variant SKU": "DB341-ZEB-0",
"Variant Grams": 0,
"Variant Inventory Tracker": "shopify",
"Variant Inventory Qty": 100,
"Variant Inventory Policy": "deny",
"Variant Fulfillment Service": "manual",
"Variant Price": 14.99,
"Variant Compare At Price": "",
"Image Src": "http://cdn.shopify.com/s/files/1/0028/4062/products/600_DB341_Zebra_Print_Bikini2.jpg?1257429506"
}

- Convert user queries into MongoDB filters.
- Use the exact field names provided in the schema.
- Use MongoDB operators like $lt, $gt, $eq, $in where applicable.
- Include the user query in all keys (i.e., Title, Body, Vendor, Type, Tags).
- Return only valid JSON (no additional text or explanations).

Example:
User query: "Diamond Skull Belt"
Expected MongoDB filter JSON:
{
  "$or": [
    { "Title": { "$regex": "Diamond", "$options": "i" } },
    { "Body": { "$regex": "Diamond", "$options": "i" } },
    { "Vendor": { "$regex": "Diamond", "$options": "i" } },
    { "Type": { "$regex": "Diamond", "$options": "i" } },
    { "Tags": { "$regex": "Diamond", "$options": "i" } },
    { "Title": { "$regex": "Skull", "$options": "i" } },
    { "Body": { "$regex": "Skull", "$options": "i" } },
    { "Vendor": { "$regex": "Skull", "$options": "i" } },
    { "Type": { "$regex": "Skull", "$options": "i" } },
    { "Tags": { "$regex": "Skull", "$options": "i" } },
    { "Title": { "$regex": "Belt", "$options": "i" } },
    { "Body": { "$regex": "Belt", "$options": "i" } },
    { "Vendor": { "$regex": "Belt", "$options": "i" } },
    { "Type": { "$regex": "Belt", "$options": "i" } },
    { "Tags": { "$regex": "Belt", "$options": "i" } }
  ]
}
    `;
    console.log('prompt', prompt);
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-haiku-20241022:beta",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 200
    });
    
    console.log('response from Openai', response.choices[0].message.content);
    // res.json({ response: response.choices[0].message.content });
    const filterMongoQuery = JSON.parse(response.choices[0].message.content);
    const products = await mongoose.connection.db.collection('products').find(filterMongoQuery).toArray();
    console.log("resp from mongo= filtered products", products);
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getOpenAICompletion };