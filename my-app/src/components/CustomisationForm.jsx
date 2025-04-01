import { useState } from "react";
import CustomField from "./CustomField";
import DataSourceInput from "./DataSourceInput";
import { useNavigate } from "react-router-dom";
import configurePromptPreview from "../utils/configurePromptPreview";
import { FaInfoCircle } from "react-icons/fa";

function CustomisationForm({ onSubmit }) {
  const navigate = useNavigate();
  const [showPreviewTooltip, setShowPreviewTooltip] = useState(false);

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
  };

  const handleNext = () => {
    handleFormSubmit(new Event("submit"));
    navigate("/uicustomisation");
  };

  return (
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
          placeholder="Select an option"
          options={["Expert", "Intermediate", "Beginner-Friendly"]}
          tooltipText="Set the AI's expertise level."
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
        />

        <CustomField
          label="Response Structure"
          name="structure"
          type="text"
          value={formData.structure}
          placeholder="Describe response structure"
          onChange={handleChange}
          tooltipText="Describe how AI responses should be structured. E.g Two paragraphs followed by a summary, or use bullet points when possible."
        />
        <CustomField
          label="Word Count"
          name="wordcount"
          type="number"
          value={formData.wordcount}
          onChange={handleChange}
          tooltipText="Set the approximate amount of words in a response, on average."
        />
        <CustomField
          label="Additional Information"
          name="additionalinfo"
          type="text"
          value={formData.additionalinfo}
          placeholder="Any Additional Information"
          onChange={handleChange}
          tooltipText="Provide any extra details that will help shape the chatbot’s responses. This could include specific instructions, domain knowledge, or contextual preferences."
        />
        <CustomField
          label="Refrain"
          name="refrain"
          type="text"
          value={formData.refrain}
          placeholder="What the chatbot should avoid"
          onChange={handleChange}
          tooltipText="Specify what the model should avoid in its responses, e.g using overcomplicated vocabulary."
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
  );
}

export default CustomisationForm;
