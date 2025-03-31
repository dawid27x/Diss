import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomField from "./CustomField";
import FileUploadButton from "./FileUploadButton";
import ColorPickerButton from "./ColorPickerButton";

const messageStyles = ["Bubble", "Straight"];

const UICustomisationForm = ({ onSave }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("uiCustomisationSettings");
    const parsedData = savedData ? JSON.parse(savedData) : {};
  
    return {
      backgroundColor: parsedData.backgroundColor || "#ffffff",
      textColor: parsedData.textColor || "#000000",
      messageStyle: parsedData.messageStyle || "Bubble",
      logo: parsedData.logo || null,
      buttons: Array.isArray(parsedData.buttons) ? parsedData.buttons : [{ name: "", task: "" }, { name: "", task: "" }],
    };
  });
  

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    localStorage.setItem("uiCustomisationSettings", JSON.stringify(updatedData));
  };

  const handleButtonChange = (index, key, value) => {
    const updatedButtons = [...formData.buttons];
    updatedButtons[index][key] = value;
    handleChange("buttons", updatedButtons);
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

      <ColorPickerButton
        label="Background Color"
        color={formData.backgroundColor}
        onChange={(color) => handleChange("backgroundColor", color)}
      />

      <ColorPickerButton
        label="Text Color"
        color={formData.textColor}
        onChange={(color) => handleChange("textColor", color)}
      />

      <CustomField
        label="Message Style"
        name="messageStyle"
        type="select"
        value={formData.messageStyle}
        onChange={(e) => handleChange("messageStyle", e.target.value)}
        options={messageStyles}
        tooltipText="Choose how messages will appear in the chat."
      />

      <FileUploadButton onChange={(value) => handleChange("logo", value)} />

      <h3 className="text-xl font-bold mt-6">Custom Buttons</h3>
      {formData.buttons.map((button, index) => (
        <div key={index} className="mt-4 p-3 border rounded-lg">
          <CustomField
            tooltipText="Custom buttons allow you to create shortcuts for specific chatbot actions. You can define a button name and assign it a task, such as summarising a conversation"
            label={`Button ${index + 1} Name`}
            name={`buttonName${index}`}
            type="text"
            value={button.name}
            onChange={(e) => handleButtonChange(index, "name", e.target.value)}
            placeholder="Enter button name"
          />
          <CustomField
            label={`Button ${index + 1} Task`}
            name={`buttonTask${index}`}
            type="text"
            value={button.task}
            onChange={(e) => handleButtonChange(index, "task", e.target.value)}
            placeholder="Enter button task"
          />
        </div>
      ))}
      <br/>

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