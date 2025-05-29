import Property from '../models/property.model.js';
import redisClient from '../config/redis.js';
import { buildPropertyFilters } from '../utils/queryBuilder.js';

export const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body, createdBy: req.user.id });
    await redisClient.del('all_properties');
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    // build filter
    const filters = buildPropertyFilters(req.query);

    // pagination & sort
    const page     = Number(req.query.page)  || 1;
    const limit    = Number(req.query.limit) || 20;
    const skip     = (page - 1) * limit;
    const sortBy   = req.query.sortBy || 'createdAt';
    const sortDir  = req.query.sortDir === 'asc' ? 1 : -1;

    // cache key must include filter+page
    const cacheKey = `props:${JSON.stringify({ filters, page, limit, sortBy, sortDir })}`;
    const cached   = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const properties = await Property
      .find(filters)
      .sort({ [sortBy]: sortDir })
      .skip(skip)
      .limit(limit);

    // simple 10-minute cache
    await redisClient.setEx(cacheKey, 600, JSON.stringify(properties));

    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: 'Property not found' });

    if (property.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Not authorized' });

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await redisClient.del('all_properties');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: 'Property not found' });

    if (property.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Not authorized' });

    await Property.findByIdAndDelete(req.params.id);
    await redisClient.del('all_properties');
    res.json({ msg: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
