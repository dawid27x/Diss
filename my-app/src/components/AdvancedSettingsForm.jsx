import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa"; 


const AdvancedSettingsForm = ({ onSave }) => {
  const [showTooltip, setShowTooltip] = useState({
    temperature: false,
    presence_penalty: false,
    frequency_penalty: false,
  });

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
    validate(formData); 
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




      <div className="mb-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center text-lg font-semibold">
      Temperature
      <FaInfoCircle
        className="ml-2 text-gray-500 cursor-pointer"
        onClick={() =>
          setShowTooltip((prev) => ({ ...prev, temperature: !prev.temperature }))
        }
      />
    </div>
    <span className="text-sm text-gray-500">{formData.temperature}</span>
  </div>

  {showTooltip.temperature && (
    <p className="text-sm text-gray-600 mt-1">
      What sampling temperature to use, between 0 and 2. Higher values make the output more random, while lower values make it more deterministic. Setting temperature to higher values (e.g. 1.8) can introduce bizarre behaviour. For a more creative model, use a temperature of e.g. 0.8.
    </p>
  )}

  <input
    type="range"
    min={0.7}
    max={1.3}
    step={0.1}
    value={formData.temperature}
    onChange={(e) => handleChange("temperature", parseFloat(e.target.value))}
    className="w-full"
  />
  {errors.temperature && (
    <p className="text-red-500 text-sm mt-1">{errors.temperature}</p>
  )}
</div>



<div className="mb-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center text-lg font-semibold">
      Presence Penalty
      <FaInfoCircle
        className="ml-2 text-gray-500 cursor-pointer"
        onClick={() =>
          setShowTooltip((prev) => ({ ...prev, presence_penalty: !prev.presence_penalty }))
        }
      />
    </div>
    <span className="text-sm text-gray-500">{formData.presence_penalty}</span>
  </div>

  {showTooltip.presence_penalty && (
    <p className="text-sm text-gray-600 mt-1">
      Positive values penalize new words based on whether they appear in the text so far, increasing the models likelihood to talk about new topics.
    </p>
  )}

  <input
    type="range"
    min={-0.5}
    max={0.5}
    step={0.1}
    value={formData.presence_penalty}
    onChange={(e) => handleChange("presence_penalty", parseFloat(e.target.value))}
    className="w-full"
  />
  {errors.presence_penalty && (
    <p className="text-red-500 text-sm mt-1">{errors.presence_penalty}</p>
  )}
</div>


<div className="mb-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center text-lg font-semibold">
      Frequency Penalty
      <FaInfoCircle
        className="ml-2 text-gray-500 cursor-pointer"
        onClick={() =>
          setShowTooltip((prev) => ({ ...prev, frequency_penalty: !prev.frequency_penalty }))
        }
      />
    </div>
    <span className="text-sm text-gray-500">{formData.frequency_penalty}</span>
  </div>

  {showTooltip.frequency_penalty && (
    <p className="text-sm text-gray-600 mt-1">
      Positive values penalize new words based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
    </p>
  )}

  <input
    type="range"
    min={-0.5}
    max={0.5}
    step={0.1}
    value={formData.frequency_penalty}
    onChange={(e) => handleChange("frequency_penalty", parseFloat(e.target.value))}
    className="w-full"
  />
  {errors.frequency_penalty && (
    <p className="text-red-500 text-sm mt-1">{errors.frequency_penalty}</p>
  )}
</div>



<div className="bg-gray-100 p-4 rounded mt-4 text-sm text-gray-700">
  <strong>Behavior Summary:</strong><br />
  {formData.temperature <= 0.8
    ? "The AI will be more focused and deterministic."
    : formData.temperature <= 1.1
    ? "The AI will strike a balance between creativity and precision."
    : "The AI will be more creative and unpredictable."}
  <br />
  {formData.presence_penalty >= 0.3
    ? "The AI will actively seek to introduce new topics."
    : formData.presence_penalty <= -0.3
    ? "The AI will stay closely tied to the current topic."
    : "The AI will maintain a neutral tendency toward topic exploration."}
  <br />
  {formData.frequency_penalty >= 0.3
    ? "The AI will avoid repeating itself."
    : formData.frequency_penalty <= -0.3
    ? "The AI may reuse similar phrases more often."
    : "The AI will moderately avoid repetition."}
</div>




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
