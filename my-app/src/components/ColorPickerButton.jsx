/* eslint-disable react/prop-types */
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPickerButton = ({ label, color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 relative">
      <span className="block text-lg font-semibold">{label}</span>

      <button
        type="button"
        className="mt-2 px-4 py-2 rounded-lg border flex items-center justify-between w-full"
        style={{ backgroundColor: color, color: "#fff", borderColor: "#ccc" }}
        onClick={() => setIsOpen(true)}
      >
        {color}
      </button>

      {isOpen && (
        <div className="absolute mt-2 p-4 bg-white border rounded-lg shadow-lg z-10">
          <HexColorPicker color={color} onChange={onChange} />
          <button
            className="mt-2 px-4 py-2 w-full bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsOpen(false)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPickerButton;
