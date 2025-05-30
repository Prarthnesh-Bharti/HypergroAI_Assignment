import mongoose from 'mongoose';

export const buildPropertyFilters = (qs) => {
  const f = {};

  // Numeric range filters
  if (qs.priceMin || qs.priceMax) {
    f.price = {
      ...(qs.priceMin && { $gte: Number(qs.priceMin) }),
      ...(qs.priceMax && { $lte: Number(qs.priceMax) }),
    };
  }

  if (qs.areaMin || qs.areaMax) {
    f.areaSqFt = {
      ...(qs.areaMin && { $gte: Number(qs.areaMin) }),
      ...(qs.areaMax && { $lte: Number(qs.areaMax) }),
    };
  }

  if (qs.bedrooms) {
    const bedrooms = qs.bedrooms.split(',').map(Number);
    f.bedrooms = { $in: bedrooms };
  }

  if (qs.bathrooms) {
    const bathrooms = qs.bathrooms.split(',').map(Number);
    f.bathrooms = { $in: bathrooms };
  }

  if (qs.ratingMin || qs.ratingMax) {
    f.rating = {
      ...(qs.ratingMin && { $gte: Number(qs.ratingMin) }),
      ...(qs.ratingMax && { $lte: Number(qs.ratingMax) }),
    };
  } else if (qs.rating) {
    // exact rating match or array of ratings
    const ratings = qs.rating.split(',').map(Number);
    f.rating = { $in: ratings };
  }

  // String exact or multiple values filters (case insensitive)
  const caseInsensitiveMatch = (values) =>
    values.map(v => new RegExp(`^${v.trim()}$`, 'i'));

  if (qs.type) {
    const types = qs.type.split(',');
    f.type = { $in: caseInsensitiveMatch(types) };
  }

  if (qs.state) {
    const states = qs.state.split(',');
    f.state = { $in: caseInsensitiveMatch(states) };
  }

  if (qs.city) {
    const cities = qs.city.split(',');
    f.city = { $in: caseInsensitiveMatch(cities) };
  }

  if (qs.furnished) {
    const furnishedOpts = qs.furnished.split(',');
    f.furnished = { $in: caseInsensitiveMatch(furnishedOpts) };
  }

  if (qs.listedBy) {
    const listedByOpts = qs.listedBy.split(',');
    f.listedBy = { $in: caseInsensitiveMatch(listedByOpts) };
  }

  if (qs.listingType) {
    const listingTypes = qs.listingType.split(',');
    f.listingType = { $in: caseInsensitiveMatch(listingTypes) };
  }

  // Boolean filter: isVerified
  if (qs.isVerified !== undefined) {
    if (qs.isVerified === 'true') f.isVerified = true;
    else if (qs.isVerified === 'false') f.isVerified = false;
  }

  // Date range filter for availableFrom
  if (qs.availableFromAfter || qs.availableFromBefore) {
    f.availableFrom = {
      ...(qs.availableFromAfter && { $gte: new Date(qs.availableFromAfter) }),
      ...(qs.availableFromBefore && { $lte: new Date(qs.availableFromBefore) }),
    };
  }

  // Partial match / regex filters for text fields (case insensitive)
  if (qs.title) {
    f.title = { $regex: qs.title, $options: 'i' };
  }

  // Amenities and tags (pipe-separated in DB, so use regex OR for filtering)
  if (qs.amenities) {
    const amenitiesArr = qs.amenities.split(',').map(a => a.trim());
    f.amenities = {
      $all: amenitiesArr.map(a => new RegExp(`(^|\\|)${a}(\\||$)`, 'i'))
    };
  }

  if (qs.tags) {
    const tagsArr = qs.tags.split(',').map(t => t.trim());
    f.tags = {
      $all: tagsArr.map(t => new RegExp(`(^|\\|)${t}(\\||$)`, 'i'))
    };
  }

  // Filtering by owner (ObjectId)
  if (qs.owner) {
    if (mongoose.Types.ObjectId.isValid(qs.owner)) {
      f.createdBy = qs.owner;
    } else {
      throw new Error('Invalid owner ID');
    }
  }

  return f;
};
