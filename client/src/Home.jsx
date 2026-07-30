import { useNavigate } from "react-router-dom";
import "./App.css";
import { useState, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
      );
      console.log(response.data);
      alert("file uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-black flex-col flex h-screen w-full">
      <div className="w-full bg-[#1D204A] h-2/4 flex justify-center items-center">
        <button
          className="text-4xl cursor-pointer border-2 rounded-md p-5 w-[350px] text-[#3BF0FF] font-bold"
          onClick={handleSelectFile}
        >
          {uploading ? "UPLOADING..." : "UPLOAD"}
        </button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        ></input>
      </div>
      <div className="w-full bg-[#3BF0FF] h-2/4 flex justify-center items-center">
        <button
          onClick={() => {
            navigate("/gallery");
          }}
          className="text-4xl border-2 p-5 rounded-md w-[350px] text-[#1D204A] cursor-pointer font-bold"
        >
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};

export default Home;
