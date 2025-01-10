import { GoogleGenerativeAI } from '@google/generative-ai'

export const useGenAI = async (modelType : string) => {
    const GOOGLE_AI_STUDIO_API_KEY = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY
    const genAI = new GoogleGenerativeAI(GOOGLE_AI_STUDIO_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const result = await model.generateContent("Can you help me learn french?")
    const response = await result.response;
    const text = response.text

    console.log("Response", response)
    console.log("Text", text)

    return model
}