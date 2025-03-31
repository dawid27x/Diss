import { useState, useEffect } from "react";

const FileUploadButton = ({ onChange }) => {
  const [logo, setLogo] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("uiCustomisationSettings")) || {};
    return storedData.logo || null;
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("uiCustomisationSettings")) || {};
    if (storedData.logo) {
      setLogo(storedData.logo);
    }
  }, []);

  const updateLocalStorage = (newLogo) => {
    const storedData = JSON.parse(localStorage.getItem("uiCustomisationSettings")) || {};
    storedData.logo = newLogo;
    localStorage.setItem("uiCustomisationSettings", JSON.stringify(storedData));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        updateLocalStorage(reader.result); 
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    updateLocalStorage(null); 
    onChange(null);
  };

  return (
    <div className="mb-4">
      <span className="block text-lg font-semibold">Upload Logo</span>

      {!logo && (
        <div className="mt-2">
          <label
            htmlFor="logo-upload"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
          >
            Upload Logo
          </label>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
      )}

      {logo && (
        <div className="mt-3 flex flex-col items-start">

          <img src={logo} alt="Logo Preview" className="w-30 h-30 object-contain border rounded-lg shadow-sm" />

          <button
            type="button"
            onClick={handleRemoveLogo}
            className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;
