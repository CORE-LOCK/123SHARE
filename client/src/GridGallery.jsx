import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Clipboard } from "lucide-react";
import Header from "./Header";

const GridGallery = () => {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error.message || error.response?.data);
    }
  };

  const handelCopy = async (url) => {
    try {
       await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      {popup ? (
        <div className="w-full fixed h-full flex justify-center bg-gray-100/50 items-center">
          <div className="h-[40vh] rounded-[20px] gap-7 flex justify-center items-center flex-col bg-black w-[40%]">
            <h2 className="text-white text-2xl font-bold">
              Do You Really Want To Delete ?
            </h2>
            <div className=" flex gap-2.5">
              <button
                onClick={() => setPopup(false)}
                className="text-white px-4 cursor-pointer py-2 rounded-md bg-red-400"
              >
                CANCLE
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedId);
                  setPopup(false);
                }}
                className="text-white px-8 py-2 cursor-pointer rounded-md bg-red-400"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-22   px-8 bg-[#3BF0FF]">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex bg-gray-200 items-center flex-col rounded-lg shadow-md p-4"
          >
            <div className="h-7 w-full flex place-content-between">
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  handelCopy(item.fileUrl);
                }}
              />

              <Trash2
                className="cursor-pointer"
                onClick={() => {
                  setPopup(true);
                  setSelectedId(item._id);
                }}
              />
            </div>

            <img
              src={item.fileUrl}
              alt={item.fileName}
              className="w-full h-52 object-contain rounded-md"
            />

            <p className="mt-3 break-all text-center font-semibold">
              {item.fileName}
            </p>
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
