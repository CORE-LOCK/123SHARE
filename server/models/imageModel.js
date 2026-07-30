import mongoose from "mongoose";


const imageModel = new mongoose.Schema({
    fileName: {
        type : String,
        required: true,
    },
    fileUrl: {
        type : String,
        required : true,
    },
    publicId: {
    type: String,
    required: true,
    // default:"",
  },
   
},{ timestamps:true});

const file = mongoose.model("file", imageModel);
export default file;