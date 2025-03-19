const configurePrompt = (formData) => {
    const { aiName, role, level, personality, tone, structure, wordcount, additionalinfo, refrain, dataSources } = formData;

    let prompt = `You are an AI assistant named "${aiName}". Your role is "${role}". 
    You should provide responses suitable for a "${level}" level user. 
    Your personality is "${personality}", and you should maintain a "${tone}" tone throughout conversations.`;

    if (wordcount) {
        prompt += ` Your responses should be approximately ${wordcount} words long when necessary.`;
    }

    if (additionalinfo) {
        prompt += ` Your responses should take into account: "${additionalinfo}".`
    }

    if (refrain) {
        prompt += ` Your responses should avoid: "${refrain}".`
    }

    if (structure) {
        prompt += ` Your responses should follow this structure: "${structure}".`;
    }

    if (dataSources.length > 0) {
        prompt += ` When needed, reference the following data sources: ${dataSources.join(", ")}.`;
    }

    return prompt;
};

export default configurePrompt;
