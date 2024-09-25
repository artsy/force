import { camelCase, snakeCase } from "lodash"

// Utility method to convert keys of a hash into snake case.
export const paramsToSnakeCase = params => {
  return Object.entries(params).reduce((acc, [field, value]) => {
    let snakeCased = snakeCase(field)
    if (snakeCased.endsWith("i_ds")) {
      snakeCased = snakeCased.replace("i_ds", "ids")
    } else if (snakeCased.endsWith("i_d")) {
      snakeCased = snakeCased.replace("i_d", "ids")
    }

    return { ...acc, [snakeCased]: value }
  }, {})
}

// Utility method to convert keys of a hash into camel case.
// It will fully capitalize an `_id` or `_ids` suffix as well.
export const paramsToCamelCase = params => {
  return Object.entries(params).reduce((acc, [field, value]) => {
    let camelCased = camelCase(field)
    if (camelCased.endsWith("Ids")) {
      camelCased = camelCased.replace("Ids", "IDs")
    } else if (camelCased.endsWith("Id")) {
      camelCased = camelCased.replace("Id", "ID")
    }

    return { ...acc, [camelCased]: value }
  }, {})
}
