import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://sonusharma:sonusharma@cluster0.ipvdds6.mongodb.net/123SHARE')
        console.log("DB connected")
    } catch (error) {
         console.log(error)
    }
}
 export default connectDB


