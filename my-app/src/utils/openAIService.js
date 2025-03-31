import OpenAI from "openai";
import configurePrompt from "./configurePrompt";


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const sendToOpenAI = async (userInput, chatHistory = []) => {
    try {
        const storedData = localStorage.getItem("customisationFormData");
        const advancedSettings = JSON.parse(localStorage.getItem("advancedSettings"));
        if (!storedData) {
            throw new Error("No saved form data found.");
        }
        console.log("here");

        const formData = JSON.parse(storedData);
        const systemPrompt = configurePrompt(formData);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                ...chatHistory, // Pass conversation history
                { role: "user", content: userInput }
            ],
            temperature: advancedSettings.temperature ?? 1,
            presence_penalty: advancedSettings.presence_penalty ?? 0,
            frequency_penalty: advancedSettings.frequency_penalty ?? 0,
        });

        return completion.choices[0].message.content;

    } catch (error) {
        console.error("Error sending request to OpenAI:", error);
        return null;
    }
};

