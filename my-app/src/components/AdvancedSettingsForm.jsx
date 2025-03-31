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
          frequency_penalty: 0,
        };
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("advancedSettings")) {
      localStorage.setItem("advancedSettings", JSON.stringify(formData));
    }
    validate(formData); // validate on mount
  }, []);

  const validate = (data) => {
    const newErrors = {};

    if (data.temperature < 0 || data.temperature > 2) {
      newErrors.temperature = "Temperature must be between 0 and 2.";
    }
    if (data.presence_penalty < -2 || data.presence_penalty > 2) {
      newErrors.presence_penalty = "Presence penalty must be between -2 and 2.";
    }
    if (data.frequency_penalty < -2 || data.frequency_penalty > 2) {
      newErrors.frequency_penalty = "Frequency penalty must be between -2 and 2.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    localStorage.setItem("advancedSettings", JSON.stringify(updatedData));
    validate(updatedData);
  };

  const handleNext = () => {
    const cleanedData = {
      temperature: isNaN(formData.temperature) ? 1 : formData.temperature,
      presence_penalty: isNaN(formData.presence_penalty) ? 0 : formData.presence_penalty,
      frequency_penalty: isNaN(formData.frequency_penalty) ? 0 : formData.frequency_penalty,
    };
  
    setFormData(cleanedData);
    localStorage.setItem("advancedSettings", JSON.stringify(cleanedData));
  
    if (validate(cleanedData)) {
      navigate("/chatbot");
    }
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
      localStorage.setItem("advancedSettings", JSON.stringify(formData));
      if (onSave) onSave(formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Advanced Settings</h2>
      <p>
        These settings allow you to fine-tune the model’s behavior, but they are entirely optional.
        Please press the tooltip icon for explanations of the features. If you’re unsure, the default
        settings will work well for most use cases.
      </p>
      <br />
      <CustomField
        label="Temperature"
        name="temperature"
        type="number"
        value={formData.temperature}
        onChange={(e) => handleChange("temperature", parseFloat(e.target.value))}
        placeholder="Enter a value between 0 and 2"
        tooltipText="What sampling temperature to use, between 0 and 2. Higher values make the output more random, while lower values make it more deterministic. Setting temperature to higher values (e.g 1.8) can introduce bizzare behaviour. For a more creative model, use a temperature of e.g 0.8."
      />
      {errors.temperature && <p className="text-red-500 text-sm mt-1">{errors.temperature}</p>}

      <CustomField
        label="Presence Penalty"
        name="presence_penalty"
        type="number"
        value={formData.presence_penalty}
        onChange={(e) => handleChange("presence_penalty", parseFloat(e.target.value))}
        placeholder="Enter a value between -2 and 2"
        tooltipText="Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
      />
      {errors.presence_penalty && <p className="text-red-500 text-sm mt-1">{errors.presence_penalty}</p>}

      <CustomField
        label="Frequency Penalty"
        name="frequency_penalty"
        type="number"
        value={formData.frequency_penalty}
        onChange={(e) => handleChange("frequency_penalty", parseFloat(e.target.value))}
        placeholder="Enter a value between -2 and 2"
        tooltipText="Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."
      />
      {errors.frequency_penalty && <p className="text-red-500 text-sm mt-1">{errors.frequency_penalty}</p>}

      <button
        type="button"
        onClick={handleNext}
        disabled={Object.keys(errors).length > 0}
        className={`w-full py-3 font-bold rounded-lg mt-3 transition ${
          Object.keys(errors).length > 0
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Next
      </button>
    </form>
  );
};

export default AdvancedSettingsForm;
