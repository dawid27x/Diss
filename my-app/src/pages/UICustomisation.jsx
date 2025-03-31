import { Link } from "react-router-dom";
import UICustomisationForm from "../components/UICustomisationForm";

function UICustomisation() {
  return (
    <>
      <header className="relative p-6 bg-gray-100">
        <Link
          to="/customisation"
          className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
        >
          ← Back
        </Link>
        <h1 className="text-4xl font-bold text-center">Customise the User Interface</h1>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
        <UICustomisationForm />
      </main>
    </>
  );
}

export default UICustomisation;
