const configurePromptPreview = (formData) => {
    const {
      aiName,
      role,
      level,
      personality,
      tone,
      structure,
      wordcount,
      additionalinfo,
      refrain,
      dataSources
    } = formData;
  
    let prompt = "";
  
    if (aiName) {
      prompt += `You are an AI assistant named "${aiName}".\n\n`;
    }
  
    if (role) {
      prompt += `Your role is "${role}".\n\n`;
    }
  
    if (level) {
      prompt += `You should provide responses suitable for a "${level}" level user.\n\n`;
    }
  
    if (personality) {
      prompt += `Your personality is "${personality}".\n\n`;
    }
  
    if (tone) {
      prompt += `You should maintain a "${tone}" tone throughout conversations.\n\n`;
    }

    if (structure) {
        prompt += `Your responses should follow this structure: "${structure}".\n\n`;
      }
  
    if (wordcount) {
      prompt += `Your responses should be approximately ${wordcount} words long when necessary.\n\n`;
    }
  
    if (additionalinfo) {
      prompt += `Your responses should take into account: "${additionalinfo}".\n\n`;
    }
  
    if (refrain) {
      prompt += `Your responses should avoid: "${refrain}".\n\n`;
    }
  

  
    if (dataSources.length > 0) {
      prompt += `When needed, reference the following data sources: ${dataSources.join(", ")}.\n`;
    }
  
    return prompt.trim(); // Removes any trailing newline
  };
  
  export default configurePromptPreview;
  