import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomField from "./CustomField";
import FileUploadButton from "./FileUploadButton";
import ColorPickerButton from "./ColorPickerButton";

const UICustomisationForm = ({ onSave }) => {
  const navigate = useNavigate();
  const aiData =
    JSON.parse(localStorage.getItem("customisationFormData")) || {};

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("uiCustomisationSettings");
    const parsedData = savedData ? JSON.parse(savedData) : {};

    return {
      backgroundColor: parsedData.backgroundColor || "#ffffff",
      textColor: parsedData.textColor || "#000000",
      logo: parsedData.logo || null,
      buttons: Array.isArray(parsedData.buttons)
        ? parsedData.buttons
        : [
            { name: "", task: "" },
            { name: "", task: "" },
          ],
    };
  });

  const handleChange = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    localStorage.setItem(
      "uiCustomisationSettings",
      JSON.stringify(updatedData)
    );
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
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl min-w-5xl">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
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
              onChange={(e) =>
                handleButtonChange(index, "name", e.target.value)
              }
              placeholder="Enter button name"
            />
            <CustomField
              label={`Button ${index + 1} Task`}
              name={`buttonTask${index}`}
              type="text"
              value={button.task}
              onChange={(e) =>
                handleButtonChange(index, "task", e.target.value)
              }
              placeholder="Enter button task"
            />
          </div>
        ))}
        <br />

        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-3"
        >
          Next
        </button>
      </form>

      {/* preview */}
      <div className="md:w-1/2">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Preview</h3>
        <div
          className="p-6 rounded-lg shadow-lg w-full flex flex-col justify-between"
          style={{ backgroundColor: formData.backgroundColor }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              {aiData.aiName || "Your Chatbot"}
            </h2>
            <p className="text-sm">{aiData.role || "AI Assistant"}</p>
          </div>

          <div
            style={{ color: formData.textColor }}
            className="bg-white p-4 rounded mb-4"
          >
            <p>Hello! I am here to help. What would you like me to do?</p>
          </div>

          <hr className="my-78 border-transparent" />

          <div className="flex flex-wrap justify-center gap-2 mb-4 ">
            {formData.buttons
              .filter((btn) => btn.name && btn.task)
              .map((button, index) => (
                <button
                  key={index}
                  className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg"
                >
                  {button.name}
                </button>
              ))}
          </div>

          <div className="flex items-center bg-white border rounded-lg px-4 py-2">
            <input
              type="text"
              disabled
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-transparent text-black focus:outline-none"
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              disabled
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UICustomisationForm;
