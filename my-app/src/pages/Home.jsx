import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-5xl font-bold mb-6">Welcome to AI Solution Helper</h1>
      <p className="text-lg text-center max-w-xl">
        This application is designed to help users create their bespoke ChatGPT solutions.
      </p>
      <Link
        to="/introduction"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Home;
