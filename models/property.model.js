import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  propertyType: String,
  description: String,
  images: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
export default Property;
