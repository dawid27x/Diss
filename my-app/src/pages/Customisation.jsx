import CustomisationForm from "../components/CustomisationForm";
import configurePrompt from "../utils/configurePrompt";

function Customisation() {
  const handleFormSubmit = (formData) => {
    console.log("Final AI Config:", formData);
    console.log("Current Prompt:", configurePrompt(formData));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-6">Customise Your Model</h1>
      <CustomisationForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Customisation;
