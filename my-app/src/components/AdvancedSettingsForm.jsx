import { useState, useEffect } from "react";
import CustomField from "./CustomField";
import { useNavigate } from "react-router-dom";


const AdvancedSettingsForm = ({ onSave }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("advancedSettings");
    return savedData
      ? JSON.parse(savedData)
      : {
          temperature: 1,
          presence_penalty: 0,
          frequency_penatly: 0,
        };
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("advancedSettings")) {
      localStorage.setItem("advancedSettings", JSON.stringify(formData));
    }
  }, []);

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    localStorage.setItem("advancedSettings", JSON.stringify(updatedData));
  };

  const handleNext = () => {
    localStorage.setItem("advancedSettings", JSON.stringify(formData)); 
    navigate("/chatbot");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Advanced Settings:", formData);
    localStorage.setItem("advancedSettings", JSON.stringify(formData)); // ✅ Ensure save on submit
    if (onSave) onSave(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Advanced Settings</h2>
      <CustomField
        label="Temperature"
        name="temperature"
        type="number"
        value={formData.temperature}
        onChange={(e) => handleChange("temperature", parseFloat(e.target.value))}
        placeholder="Enter a value between 0 and 2"
        tooltipText="What sampling temperature to use, between 0 and 2. Higher values make the output more random, while lower values make it more deterministic."
      />
      <CustomField
        label="Presence Penalty"
        name="presence_penatly"
        type="number"
        value={formData.presence_penalty}
        onChange={(e) => handleChange("presence_penalty", parseFloat(e.target.value))}
        placeholder="Enter a value between -2 and 2"
        tooltipText="Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
      />
      <CustomField
        label="Frequency Penalty"
        name="frequency_penatly"
        type="number"
        value={formData.frequency_penalty}
        onChange={(e) => handleChange("frequency_penalty", parseFloat(e.target.value))}
        placeholder="Enter a value between -2 and 2"
        tooltipText="Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Save UI Settings
      </button>
      <button type="button" onClick={handleNext} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-3">
        Next
      </button>
    </form>
  );
};

export default AdvancedSettingsForm;
