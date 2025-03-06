/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";



function CustomField({ label, name, type, value, options, placeholder, onChange, tooltipText }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-4">
      <label className="flex items-center text-lg font-semibold">
        {label}
        {tooltipText && (
          <FaInfoCircle
            className="ml-2 text-gray-500 cursor-pointer"
            onClick={() => setShowTooltip(!showTooltip)}
          />
        )}
      </label>

      {showTooltip && <p className="text-sm text-gray-600 mt-1">{tooltipText}</p>}

      {type === "select" ? (
        <select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-lg">
          <option value="" disabled selected>
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-lg"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default CustomField;
