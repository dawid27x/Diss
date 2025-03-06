import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomField from "./CustomField";
import FileUploadButton from "./FileUploadButton";
import ColorPickerButton from "./ColorPickerButton";

const fonts = ["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"];
const messageStyles = ["Bubble", "Straight"];


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
          messageStyle: "Bubble",
          logo: null,
        };
  });

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    localStorage.setItem("uiCustomisationSettings", JSON.stringify(updatedData));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("UI Settings:", formData);
    if (onSave) onSave(formData);
  };

  const handleNext = () => {
    handleFormSubmit(new Event("submit"));
    navigate("/advancedsettings"); 
  };

  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Customise Your UI</h2>

      {/* Background Color Picker (New Button) */}
      <ColorPickerButton
        label="Background Color"
        color={formData.backgroundColor}
        onChange={(color) => handleChange("backgroundColor", color)}
      />

      {/* Text Color Picker (New Button) */}
      <ColorPickerButton
        label="Text Color"
        color={formData.textColor}
        onChange={(color) => handleChange("textColor", color)}
      />

      {/* Font Selection (Using CustomField) */}
      <CustomField
        label="Font"
        name="font"
        type="select"
        value={formData.font}
        onChange={(e) => handleChange("font", e.target.value)}
        options={fonts}
        tooltipText="Choose the font for your chatbot text."
      />

      {/* Message Style Selection (Using CustomField) */}
      <CustomField
        label="Message Style"
        name="messageStyle"
        type="select"
        value={formData.messageStyle}
        onChange={(e) => handleChange("messageStyle", e.target.value)}
        options={messageStyles}
        tooltipText="Choose how messages will appear in the chat."
      />

      {/* Logo Upload (Using Custom Component) */}
      <FileUploadButton onChange={(value) => handleChange("logo", value)} />

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
