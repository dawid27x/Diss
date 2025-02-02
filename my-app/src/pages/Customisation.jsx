import CustomisationForm from "../components/CustomisationForm";

function Customisation() {
  const handleFormSubmit = (formData) => {
    console.log("Final AI Config:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-6">Customize Your AI</h1>
      <CustomisationForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Customisation;
