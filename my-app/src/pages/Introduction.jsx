import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <Link
        to="/"
        className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        ← Back
      </Link>
      <h1 className="text-4xl font-bold mb-6">Introduction</h1>
      <p className="text-lg text-center max-w-xl">
        This application will guide you through a process that allows you to create a bespoke ChatGPT Wrapper.
        The process involves completing a series of customisation options that when finalised, will form a specialised 
        prompt guiding the AI model to give you answers that you want, removing the reliance on
        paid solutions. 
      </p>
      <br/>
      <p className="text-lg text-center max-w-xl">
        The application is extended to provide you with the means to customise the user interface and 
        create custom buttons to improve usability. You will get the chance to interact with your specialised model 
        before getting the option to return back to the customisation phase to make amends.
      </p>
      <div className="flex space-x-6 mt-6">
        <Link
          to="/customisation"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default Introduction;
