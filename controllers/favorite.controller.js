import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Property from '../models/property.model.js';

export const addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ msg: 'Invalid property ID' });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId);
      await user.save();
    }
    res.json({ msg: 'Property added to favorites' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ msg: 'Invalid property ID' });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { favorites: propertyId },
    });
    res.json({ msg: 'Property removed from favorites' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
