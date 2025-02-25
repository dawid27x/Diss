const configurePrompt = (formData) => {
    const { aiName, role, level, personality, tone, structure, format, dataSources } = formData;

    let prompt = `You are an AI assistant named "${aiName}". Your role is "${role}". 
    You should provide responses suitable for a "${level}" level user. 
    Your personality is "${personality}", and you should maintain a "${tone}" tone throughout conversations.`;

    if (structure) {
        prompt += ` Your responses should follow this structure: "${structure}".`;
    }

    if (format) {
        prompt += ` Format your responses as "${format}".`;
    }

    if (dataSources.length > 0) {
        prompt += ` When needed, reference the following data sources: ${dataSources.join(", ")}.`;
    }

    return prompt;
};

export default configurePrompt;
