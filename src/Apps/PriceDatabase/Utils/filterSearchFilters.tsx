export const filterSearchFilters = (filters, allowedFilters) =>
  Object.keys(filters)
    .filter(key => allowedFilters.includes(key))
    .reduce((obj, key) => {
      obj[key] = filters[key]
      return obj
    }, {})
