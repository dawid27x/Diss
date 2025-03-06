import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";

const fonts = ["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"];


// eslint-disable-next-line react/prop-types
const UICustomisationForm = ({ onSave }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("uiCustomisationSettings");
    return savedData
      ? JSON.parse(savedData)
      : {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          font: "Arial",
          messageStyle: "bubble",
          logo: null,
        };
  });

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    localStorage.setItem("uiCustomisationSettings", JSON.stringify(updatedData));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("UI Settings:", formData);
    if (onSave) onSave(formData);
  };

  const handleNext = () => {
    handleFormSubmit(new Event("submit"));
    navigate("/chatbot"); // Adjust if needed
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">

      {/* Background Color Picker */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Background Color</label>
        <HexColorPicker
          color={formData.backgroundColor}
          onChange={(color) => handleChange("backgroundColor", color)}
          className="mt-2"
        />
      </div>

      {/* Text Color Picker */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Text Color</label>
        <HexColorPicker
          color={formData.textColor}
          onChange={(color) => handleChange("textColor", color)}
          className="mt-2"
        />
      </div>

      {/* Font Selection */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Font</label>
        <select
          value={formData.font}
          onChange={(e) => handleChange("font", e.target.value)}
          className="w-full p-2 border rounded"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Message Style */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Message Style</label>
        <div className="flex space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              formData.messageStyle === "bubble" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleChange("messageStyle", "bubble")}
          >
            Bubble
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              formData.messageStyle === "straight" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleChange("messageStyle", "straight")}
          >
            Straight
          </button>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Upload Logo</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {formData.logo && <img src={formData.logo} alt="Preview" className="mt-2 w-24 h-24" />}
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Save UI Settings
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-3"
      >
        Next
      </button>
    </form>
  );
};

export default UICustomisationForm;
