import { useState } from "react";
import CustomField from "./CustomField";
import { useNavigate } from "react-router-dom";


const effortOptions = ["low", "medium", "high"];

const AdvancedSettingsForm = ({ onSave }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("advancedSettings");
    return savedData
      ? JSON.parse(savedData)
      : {
          effort: "medium",
          temperature: 1,
          store: true,
        };
  });

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    localStorage.setItem("advancedSettings", JSON.stringify(updatedData));
  };

  const navigate = useNavigate(); 


  const handleNext = () => {
    handleFormSubmit(new Event("submit")); 
    navigate("/chatbot");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Advanced Settings:", formData);
    if (onSave) onSave(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Advanced Settings</h2>

      {/* Effort Selection */}
      <CustomField
        label="Effort"
        name="effort"
        type="select"
        value={formData.effort}
        onChange={(e) => handleChange("effort", e.target.value)}
        options={effortOptions}
        tooltipText="Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high."
      />

      {/* Temperature Input */}
      <CustomField
        label="Temperature"
        name="temperature"
        type="number"
        value={formData.temperature}
        onChange={(e) => handleChange("temperature", parseFloat(e.target.value))}
        placeholder="Enter a value between 0 and 2"
        tooltipText="What sampling temperature to use, between 0 and 2. Higher values make the output more random, while lower values make it more deterministic."
      />

      {/* Store Response Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          name="store"
          checked={formData.store}
          onChange={(e) => handleChange("store", e.target.checked)}
          className="mr-2"
        />
        <label className="text-lg font-semibold">Store Response</label>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Save Settings
      </button>
      <button type="button" onClick={handleNext} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-3">
        Next
      </button>
    </form>
  );
};

export default AdvancedSettingsForm;
