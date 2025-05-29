import dotenv from 'dotenv';
import csv from 'csvtojson';
import mongoose from 'mongoose';
import Property from '../models/property.model.js';
import connectDB from '../config/db.js';

dotenv.config();

const csvFilePath = './db424fd9fb74_1748258398689.csv'; 

const importCSV = async () => {
  try {
    await connectDB();
    const jsonArray = await csv().fromFile(csvFilePath);

    // You might need to clean or transform data here
    const propertiesWithCreator = jsonArray.map(item => ({
      ...item,
      createdBy: new mongoose.Types.ObjectId(), // dummy user ID or update with actual ID
    }));

    await Property.insertMany(propertiesWithCreator);
    console.log('CSV data imported successfully');
    process.exit();
  } catch (err) {
    console.error('Error importing CSV:', err);
    process.exit(1);
  }
};

importCSV();
