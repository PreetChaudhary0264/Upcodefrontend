import React from "react";

const Upload = ({ name, label, register, setValue, errors, video = false }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue(name, file); // react-hook-form ke state me file set kar dena
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>
      <input
        type="file"
        accept={video ? "video/*" : "image/*"}
        onChange={handleFileChange}
        className="w-full border p-2 rounded-md"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{label} is required</span>
      )}
    </div>
  );
};

export default Upload;
