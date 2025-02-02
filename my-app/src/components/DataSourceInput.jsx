import { useState } from "react";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

function DataSourceInput({ dataSources, setDataSources }) {
  const [currentSource, setCurrentSource] = useState(""); // Stores input value
  const [errorMessage, setErrorMessage] = useState(""); // Stores validation error
  const [showTooltip, setShowTooltip] = useState(false); // Manages tooltip visibility

  // 🔹 URL Validation Function
  const isValidURL = (url) => {
    try {
      new URL(url); // Checks if the input is a valid URL
      return true;
    } catch (_) {
      return false;
    }
  };

  // 🔹 Add a Source Link
  const addSource = () => {
    if (!currentSource.trim()) {
      setErrorMessage("Please enter a link.");
      return;
    }

    if (!isValidURL(currentSource)) {
      setErrorMessage("Invalid URL. Enter a valid link (e.g., https://example.com).");
      return;
    }

    if (dataSources.includes(currentSource)) {
      setErrorMessage("This link has already been added.");
      return;
    }

    // If valid, add the link and reset input & error
    setDataSources([...dataSources, currentSource]);
    setCurrentSource("");
    setErrorMessage("");
  };

  // 🔹 Remove a Source Link
  const removeSource = (index) => {
    const updatedSources = dataSources.filter((_, i) => i !== index);
    setDataSources(updatedSources);
  };

  return (
    <div className="mb-4">
      <label className="flex items-center text-lg font-semibold">
        Source of Data
        <FaInfoCircle
          className="ml-2 text-gray-500 cursor-pointer"
          onClick={() => setShowTooltip(!showTooltip)}
        />
      </label>

      {/* Tooltip */}
      {showTooltip && (
        <p className="text-sm text-gray-600 mt-1">
          Enter trusted sources (e.g., https://reuters.com). Click "Add" after entering each link.
        </p>
      )}

      {/* Input & Add Button */}
      <div className="flex mt-2">
        <input
          type="text"
          value={currentSource}
          onChange={(e) => setCurrentSource(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Enter a valid URL"
        />
        <button
          type="button"
          onClick={addSource}
          className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Show error message */}
      {errorMessage && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}

      {/* Display Entered Sources */}
      <div className="mt-3 flex flex-wrap gap-2">
        {dataSources.map((source, index) => (
          <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-lg">
            <span className="text-sm">{source}</span>
            <FaTimes
              className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => removeSource(index)}
            />

          </div>
        ))}
      </div>
    </div>
  );
}

export default DataSourceInput;
