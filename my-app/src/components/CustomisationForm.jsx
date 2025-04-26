import { useState } from "react";
import CustomField from "./CustomField";
import DataSourceInput from "./DataSourceInput";
import { useNavigate } from "react-router-dom";
import configurePromptPreview from "../utils/configurePromptPreview";
import { FaInfoCircle } from "react-icons/fa";
import { customisationSchema } from "../schemas/customisationSchema";
import { checkPersonalityToneConflict } from "../schemas/customisationSchema";


function CustomisationForm({ onSubmit }) {
  const navigate = useNavigate();
  const [warningMessage, setWarningMessage] = useState("");
  const [showPreviewTooltip, setShowPreviewTooltip] = useState(false);
  const [formErrors, setFormErrors] = useState({});


  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("customisationFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          aiName: "",
          role: "",
          level: "",
          personality: "",
          tone: "",
          structure: "",
          wordcount: 0,
          additionalinfo: "",
          refrain: "",
          dataSources: [],
        };
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedData = { 
      ...formData, 
      [name]: type === "number" ? Number(value) : value 
    };
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
  
    const validationResult = customisationSchema.safeParse(formData);
  
    if (!validationResult.success) {
      const errors = {};
      validationResult.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      setWarningMessage("");  // Clear any previous warnings
      return "error";
    }
  
    setFormErrors({}); // Clear errors
  
    const hasConflict = checkPersonalityToneConflict(formData);
    if (hasConflict) {
      setWarningMessage("Selected Personality and Tone may conflict. Please review your choices or continue.");
      return "warning";
    }
  
    setWarningMessage("");  // Clear any previous warnings
    return "success";
  };
  
  const handleNext = () => {
    const result = handleFormSubmit(new Event("submit"));
  
    if (result === "success") {
      navigate("/uicustomisation");
    }
    // if warning, do nothing immediately – user will see warning and can click "Continue Anyway"
  };
  
  
  

  return ( 
    <>

    {warningMessage && (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded max-w-5xl min-w-5xl">
        <p className="font-semibold">⚠️ Warning</p>
        <p>{warningMessage}</p>
        <button
          className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => navigate("/uicustomisation")}
        >
          Continue Anyway
        </button>
      </div>
    )}
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl min-w-5xl">

      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded-lg shadow-lg basis-2/3"
      >
        <CustomField
          label="AI Name"
          name="aiName"
          type="text"
          value={formData.aiName}
          placeholder="Enter AI Name"
          onChange={handleChange}
          tooltipText="Give your AI a unique name."
          error={formErrors.aiName}
        />


        <CustomField
          label="AI Role"
          name="role"
          type="text"
          value={formData.role}
          placeholder="Enter AI Role (e.g., Financial Advisor)"
          onChange={handleChange}
          tooltipText="Define the AI's role (e.g., Financial Advisor, Market Analyst)."
          error={formErrors.role}
        />

        <CustomField
          label="AI Level"
          name="level"
          type="select"
          value={formData.level}
          onChange={handleChange}
          placeholder="Select an option"
          options={["Expert", "Intermediate", "Beginner-Friendly"]}
          tooltipText="Set the AI's expertise level."
          error={formErrors.level}
        />

        <CustomField
          label="Personality"
          name="personality"
          type="select"
          value={formData.personality}
          onChange={handleChange}
          placeholder="Select an option"
          options={[
            "Friendly",
            "Professional",
            "Humorous",
            "Direct",
            "Creative",
          ]}
          tooltipText="Choose the AI's personality style."
          error={formErrors.personality}
        />

        <CustomField
          label="Tone"
          name="tone"
          type="select"
          placeholder="Select an option"
          value={formData.tone}
          onChange={handleChange}
          options={["Casual", "Formal", "Neutral", "Encouraging", "Direct"]}
          tooltipText="Set the communication style."
          error={formErrors.tone}
        />

        <CustomField
          label="Response Structure"
          name="structure"
          type="text"
          value={formData.structure}
          placeholder="Describe response structure"
          onChange={handleChange}
          tooltipText="Describe how AI responses should be structured. E.g Two paragraphs followed by a summary, or use bullet points when possible."
          error={formErrors.aiName}
        />
        <CustomField
          label="Word Count"
          name="wordcount"
          type="number"
          value={formData.wordcount}
          onChange={handleChange}
          tooltipText="Set the approximate amount of words in a response, on average."
          error={formErrors.wordcount}
        />
        <CustomField
          label="Additional Information"
          name="additionalinfo"
          type="text"
          value={formData.additionalinfo}
          placeholder="Any Additional Information"
          onChange={handleChange}
          tooltipText="Provide any extra details that will help shape the chatbot’s responses. This could include specific instructions, domain knowledge, or contextual preferences."
          error={formErrors.additionalinfo}
        />
        <CustomField
          label="Refrain"
          name="refrain"
          type="text"
          value={formData.refrain}
          placeholder="What the chatbot should avoid"
          onChange={handleChange}
          tooltipText="Specify what the model should avoid in its responses, e.g using overcomplicated vocabulary."
          error={formErrors.refrain}
        />

        <DataSourceInput
          dataSources={formData.dataSources}
          setDataSources={handleDataSourcesChange}
        />

        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-3"
        >
          Next
        </button>
      </form>
      <aside className="bg-white p-4 rounded-lg shadow basis-1/2">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          Live Prompt Preview
          <FaInfoCircle
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowPreviewTooltip(!showPreviewTooltip)}
          />
        </h2>
        {showPreviewTooltip && (
          <p className="text-sm text-gray-600 mb-2">
            This live prompt represents the actual instructions sent to an AI
            model. These instructions are acknowledged and reflected in every
            response your AI generates. This is the core of how many companies
            build products, features, and tools — often behind the scenes. Here,
            you get full visibility and control over it.
          </p>
        )}

        <pre className="whitespace-pre-wrap text-md">
          {configurePromptPreview(formData)}
        </pre>
      </aside>
    </div>
    </>
  );
}

export default CustomisationForm;
