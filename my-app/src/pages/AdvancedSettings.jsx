import { Link } from "react-router-dom";
import AdvancedSettingsForm from "../components/AdvancedSettingsForm";

function AdvancedSettings() {
  return (
    <>
      <header className="relative p-6 bg-gray-100">
        <Link
          to="/uicustomisation"
          className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
        >
          ← Back
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
        <h1 className="text-4xl py-6 font-bold text-center">Advanced Settings</h1>
        <AdvancedSettingsForm />
      </main>
    </>
  );
}

export default AdvancedSettings;
