export const buildPropertyFilters = (qs) => {
  const f = {};

  // numeric ranges
  if (qs.priceMin || qs.priceMax)
    f.price = {
      ...(qs.priceMin && { $gte: Number(qs.priceMin) }),
      ...(qs.priceMax && { $lte: Number(qs.priceMax) }),
    };

  if (qs.areaMin || qs.areaMax)
    f.area = {
      ...(qs.areaMin && { $gte: Number(qs.areaMin) }),
      ...(qs.areaMax && { $lte: Number(qs.areaMax) }),
    };

  // list or single values
  const listify = (v) => v.split(',').map((x) => x.trim());

  if (qs.bedrooms) f.bedrooms = { $in: listify(qs.bedrooms).map(Number) };
  if (qs.bathrooms) f.bathrooms = { $in: listify(qs.bathrooms).map(Number) };
  if (qs.type) f.propertyType = { $in: listify(qs.type) };
  if (qs.owner) f.createdBy = qs.owner;

  // text search / regex
  if (qs.location)
    f.location = { $regex: qs.location, $options: 'i' };

  if (qs.q)
    f.title = { $regex: qs.q, $options: 'i' };

  // date range
  if (qs.after || qs.before)
    f.createdAt = {
      ...(qs.after && { $gte: new Date(qs.after) }),
      ...(qs.before && { $lte: new Date(qs.before) }),
    };

  return f;
};
