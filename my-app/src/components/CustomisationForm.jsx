import { useState } from "react";
import CustomField from "./CustomField";
import DataSourceInput from "./DataSourceInput";
import { useNavigate } from "react-router-dom"; // ✅ Add this if using React Router

function CustomisationForm({ onSubmit }) {
  const navigate = useNavigate(); // ✅ Use this if navigation is needed

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("customisationFormData");
    return savedData ? JSON.parse(savedData) : {
      aiName: "",
      role: "",
      level: "",
      personality: "",
      tone: "",
      structure: "",
      format: "",
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
    alert("AI settings saved!");
  };

  const handleNext = () => {
    handleFormSubmit(new Event("submit")); // ✅ Save form data before moving to the next step
    navigate("/uicustomisation"); // ✅ Change "/next-step" to the actual next page route
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
        options={["Optimistic", "Analytical", "Humorous", "Serious"]}
        tooltipText="Choose the AI's personality style."
      />

      <CustomField
        label="Tone"
        name="tone"
        type="select"
        value={formData.tone}
        onChange={handleChange}
        options={["Formal", "Casual", "Friendly", "Authoritative", "Empathetic"]}
        tooltipText="Set the communication style."
      />

      <CustomField
        label="Response Structure"
        name="structure"
        type="text"
        value={formData.structure}
        placeholder="Describe response structure"
        onChange={handleChange}
        tooltipText="Describe how AI responses should be structured."
      />

      <CustomField
        label="Response Format"
        name="format"
        type="select"
        value={formData.format}
        onChange={handleChange}
        options={["Paragraphs", "Bullet Points", "Tables"]}
        tooltipText="Choose how responses are formatted."
      />

      <DataSourceInput
        dataSources={formData.dataSources}
        setDataSources={handleDataSourcesChange} // ✅ Fix: Save dataSources correctly
      />

      <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
        Save AI Settings
      </button>
      <button type="button" onClick={handleNext} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-3">
        Next
      </button>
    </form>
  );
}

export default CustomisationForm;
