import file from '../models/imageModel.js';

const getFIles = async (req, res)=>{
    try {
         const getfiles = await file.find({});  
         return res.status(200).json({
            success : true,
            data: getfiles,
         })
    } catch (error) {
        console.log(error)
    }
};

export default getFIles;