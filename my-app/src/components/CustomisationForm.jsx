import { useState } from "react";
import CustomField from "./CustomField";
import DataSourceInput from "./DataSourceInput";
import { useNavigate } from "react-router-dom";

function CustomisationForm({ onSubmit }) {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("customisationFormData");
    return savedData ? JSON.parse(savedData) : {
      aiName: "",
      role: "",
      level: "",
      personality: "",
      tone: "",
      structure: "",
      wordcount: 0,
      additionalinfo: "",
      refraine: "",
      dataSources: [],
    };
  });

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    localStorage.setItem("customisationFormData", JSON.stringify(updatedData)); 
  };

  const handleDataSourcesChange = (sources) => {
    const updatedData = { ...formData, dataSources: sources };
    setFormData(updatedData);
    localStorage.setItem("customisationFormData", JSON.stringify(updatedData)); 
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("AI Configuration:", formData);
    onSubmit(formData);
  };

  const handleNext = () => {
    handleFormSubmit(new Event("submit")); 
    navigate("/uicustomisation");
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <CustomField
        label="AI Name"
        name="aiName"
        type="text"
        value={formData.aiName}
        placeholder="Enter AI Name"
        onChange={handleChange}
        tooltipText="Give your AI a unique name."
      />

      <CustomField
        label="AI Role"
        name="role"
        type="text"
        value={formData.role}
        placeholder="Enter AI Role (e.g., Financial Advisor)"
        onChange={handleChange}
        tooltipText="Define the AI's role (e.g., Financial Advisor, Market Analyst)."
      />

      <CustomField
        label="AI Level"
        name="level"
        type="select"
        value={formData.level}
        onChange={handleChange}
        options={["Expert", "Intermediate", "Beginner-Friendly"]}
        tooltipText="Set the AI's expertise level."
      />

      <CustomField
        label="Personality"
        name="personality"
        type="select"
        value={formData.personality}
        onChange={handleChange}
        options={["Friendly", "Professional", "Humorous", "Direct", "Creative"]}
        tooltipText="Choose the AI's personality style."
      />

      <CustomField
        label="Tone"
        name="tone"
        type="select"
        value={formData.tone}
        onChange={handleChange}
        options={["Casual", "Formal", "Neutral", "Encouraging", "Direct"]}
        tooltipText="Set the communication style."
      />

      <CustomField
        label="Response Structure"
        name="structure"
        type="text"
        value={formData.structure}
        placeholder="Describe response structure"
        onChange={handleChange}
        tooltipText="Describe how AI responses should be structured. E.g Two paragraphs followed by a summary. Use Bullet points when possible."
      />
      <CustomField
        label="Word Count"
        name="wordcount"
        type="number"
        value={formData.wordcount}
        onChange={handleChange}
        tooltipText="Set the approximate amount of words in a response, on average."
      />
      <CustomField
        label="Additional Information"
        name="additionalinfo"
        type="text"
        value={formData.additionalinfo}
        placeholder="Any Additional Information"
        onChange={handleChange}
        tooltipText="Provide any extra details that will help shape the chatbot’s responses. This could include specific instructions, domain knowledge, or contextual preferences."
      />
      <CustomField
        label="Refrain"
        name="refrain"
        type="text"
        value={formData.refrain}
        placeholder="What the chatbot should avoid"
        onChange={handleChange}
        tooltipText="Specify what the model should avoid in its responses, e.g using overcomplicated vocabulary."
      />

      <DataSourceInput
        dataSources={formData.dataSources}
        setDataSources={handleDataSourcesChange}
      />

      {/* <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
        Save AI Settings
      </button> */}
      <button type="button" onClick={handleNext} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-3">
        Next
      </button>
    </form>
  );
}

export default CustomisationForm;
