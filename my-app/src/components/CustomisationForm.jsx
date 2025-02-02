import { useState } from "react";
import CustomField from "./CustomField";
import DataSourceInput from "./DataSourceInput";

function CustomisationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    aiName: "",
    role: "",
    level: "",
    personality: "",
    tone: "",
    structure: "",
    format: "",
    dataSources: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("AI Configuration:", formData);
    onSubmit(formData);
    alert("AI settings saved!");
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      {/* 🔹 AI Name */}
      <CustomField
        label="AI Name"
        name="aiName"
        type="text"
        value={formData.aiName}
        placeholder="Enter AI Name"
        onChange={handleChange}
        tooltipText="Give your AI a unique name."
      />

      {/* 🔹 AI Role */}
      <CustomField
        label="AI Role"
        name="role"
        type="text"
        value={formData.role}
        placeholder="Enter AI Role (e.g., Financial Advisor)"
        onChange={handleChange}
        tooltipText="Define the AI's role (e.g., Financial Advisor, Market Analyst)."
      />

      {/* 🔹 AI Level */}
      <CustomField
        label="AI Level"
        name="level"
        type="select"
        value={formData.level}
        onChange={handleChange}
        options={["Expert", "Intermediate", "Beginner-Friendly"]}
        tooltipText="Set the AI's expertise level."
      />

      {/* 🔹 AI Personality */}
      <CustomField
        label="Personality"
        name="personality"
        type="select"
        value={formData.personality}
        onChange={handleChange}
        options={["Optimistic", "Analytical", "Humorous", "Serious"]}
        tooltipText="Choose the AI's personality style."
      />

      {/* 🔹 AI Tone */}
      <CustomField
        label="Tone"
        name="tone"
        type="select"
        value={formData.tone}
        onChange={handleChange}
        options={["Formal", "Casual", "Friendly", "Authoritative", "Empathetic"]}
        tooltipText="Set the communication style."
      />

      {/* 🔹 Response Structure */}
      <CustomField
        label="Response Structure"
        name="structure"
        type="text"
        value={formData.structure}
        placeholder="Describe response structure"
        onChange={handleChange}
        tooltipText="Describe how AI responses should be structured."
      />

      {/* 🔹 Response Format */}
      <CustomField
        label="Response Format"
        name="format"
        type="select"
        value={formData.format}
        onChange={handleChange}
        options={["Paragraphs", "Bullet Points", "Tables"]}
        tooltipText="Choose how responses are formatted."
      />

      {/* 🔹 Data Source Input Component */}
      <DataSourceInput
        dataSources={formData.dataSources}
        setDataSources={(sources) => setFormData({ ...formData, dataSources: sources })}
      />

      {/* Submit Button */}
      <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
        Save AI Settings
      </button>
    </form>
  );
}

export default CustomisationForm;
