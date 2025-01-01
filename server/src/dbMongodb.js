import mongoose from 'mongoose'
import { url_data } from './config.js';


export const connectDB =  async () => {
    try {
        await mongoose.connect(url_data);
        console.log("Database conectada");    
    } catch (error) {
        console.error(error)
    }
    
        
}
console.log("holaa")



