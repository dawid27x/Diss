import { useState } from "react";


// eslint-disable-next-line react/prop-types
const FileUploadButton = ({ onChange }) => {
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    onChange(null);
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold">Upload Logo</label>
      <input type="file" accept="image/*" onChange={handleLogoUpload} className="mt-2" />
      {logo && (
        <div className="mt-3 flex flex-col items-start">
          <img src={logo} alt="Logo Preview" className="w-24 h-24 object-contain border rounded-lg shadow-sm" />
          <button
            type="button"
            onClick={handleRemoveLogo}
            className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
          >
            Remove Logo
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;
