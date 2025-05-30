import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";




function CustomField({ label, name, type, value, options, placeholder, onChange, tooltipText, error }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const inputId = `custom-field-${name}`;

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="flex items-center text-lg font-semibold">
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
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="" disabled>
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
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-lg"
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

    </div>

  );

}


export default CustomField;
