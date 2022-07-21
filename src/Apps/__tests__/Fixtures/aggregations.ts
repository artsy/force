import { Aggregation } from "Components/ArtworkFilter/ArtworkFilterContext"

export const artistAggregation: Aggregation = {
  slice: "ARTIST",
  counts: [
    {
      count: 483,
      name: "Massimo Listri",
      value: "massimo-listri",
    },
  ],
}

export const partnerAggregation: Aggregation = {
  slice: "PARTNER",
  counts: [
    {
      name: "Rago/Wright",
      value: "rago-slash-wright",
      count: 2,
    },
  ],
}

export const locationCityAggregation: Aggregation = {
  slice: "LOCATION_CITY",
  counts: [
    {
      name: "New York, NY, USA",
      value: "New York, NY, USA",
      count: 10,
    },
  ],
}

export const mediumAggregation: Aggregation = {
  slice: "MEDIUM",
  counts: [
    {
      name: "Painting",
      value: "painting",
      count: 472023,
    },
  ],
}

export const materialsTermsAggregation: Aggregation = {
  slice: "MATERIALS_TERMS",
  counts: [
    {
      name: "Canvas",
      value: "canvas",
      count: 17,
    },
  ],
}

export const artistNationalityAggregation: Aggregation = {
  slice: "ARTIST_NATIONALITY",
  counts: [
    {
      name: "American",
      value: "American",
      count: 21,
    },
  ],
}
