import { Link } from "react-router-dom";
import AdvancedSettingsForm from "../components/AdvancedSettingsForm";


function AdvancedSettings() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6 relative">
      <Link
        to="/uicustomisation"
        className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        ← Back
      </Link>

      <h1 className="text-4xl font-bold mb-6">Advanced Settings</h1>
        <AdvancedSettingsForm/>
    </div>
  );
}

export default AdvancedSettings;

