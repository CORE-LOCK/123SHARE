import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Header from "./Header"

const GridGallery = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:5000/upload");
    setData(response.data.data);
    console.log(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = async (fileUrl, fileName) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(downloadUrl);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/File/${id}`);
      console.log(response.data);
      setData((prev)=>prev.filter((item) => item._id !==id));

       alert("File deleted successfully!");

    } catch (error) {
      console.log(error.message || error.response?.data);
    }
}


  return (
    <div className="h-[100vh] bg-[#3BF0FF]">
    <Header />
      <div className="grid grid-cols-4 gap-6 p-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex bg-gray-200 items-center flex-col rounded-lg shadow-md p-4"
          >
            <Trash2 className="ml-60 cursor-pointer"
             onClick={()=>{handleDelete(item._id)}} />
            <img
              src={item.fileUrl}
              alt={item.fileName}
            
              className="w-full h-52 object-contain rounded-md"
            />

            <p className="mt-3 break-all text-center font-semibold">{item.fileName}</p>
            <button className="mt-1.5 cursor-pointer p-2 bg-black rounded-md">
              <p
                className="text-white"
                onClick={() => {
                  handleDownload(item.fileUrl, item.fileName);
                }}
              >
                DOWNLOAD
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridGallery;
