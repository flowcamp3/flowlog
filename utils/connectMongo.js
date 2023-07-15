//Mongoose를 이용해서 mongoDB와 연결하는 함수
import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI);

export default connectMongo;
