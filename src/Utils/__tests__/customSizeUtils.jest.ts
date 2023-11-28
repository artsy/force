import {
  CustomSize,
  SIZES_IN_CENTIMETERS,
  SIZES_IN_INCHES,
  getCustomSizeRangeInInches,
  getPredefinedSizesByMetric,
  parseSizeRange,
} from "Utils/customSizeUtils"

describe("getPredefinedSizesByMetric", () => {
  it("should return predefined sizes in centimeters when `cm` metric is specified", () => {
    expect(getPredefinedSizesByMetric("cm")).toEqual(SIZES_IN_CENTIMETERS)
  })

  it("should return predefined sizes in inches when `in` metric is specified", () => {
    expect(getPredefinedSizesByMetric("in")).toEqual(SIZES_IN_INCHES)
  })
})

describe("parseSizeRange", () => {
  it("correctly parse range in inches", () => {
    expect(parseSizeRange("10-20", "in")).toEqual([10, 20])
  })

  it("correctly parse range in inches with default value", () => {
    expect(parseSizeRange("10-*", "in")).toEqual([10, "*"])
  })

  it("correctly parse range in inches when all values are default", () => {
    expect(parseSizeRange("*-*", "in")).toEqual(["*", "*"])
  })

  it("correctly parse range in centimeters", () => {
    expect(parseSizeRange("1-2", "cm")).toEqual([3, 5])
  })

  it("correctly parse range in centimeters with default value", () => {
    expect(parseSizeRange("1-*", "cm")).toEqual([3, "*"])
  })

  it("correctly parse range in centimeters when all values are default", () => {
    expect(parseSizeRange("*-*", "cm")).toEqual(["*", "*"])
  })
})

describe("getCustomSizeRangeInInches", () => {
  it("should return correct custom size ranges in inches", () => {
    const range: CustomSize = {
      width: [5, 10],
      height: [15, 20],
    }
    const result = {
      width: "5-10",
      height: "15-20",
    }

    expect(getCustomSizeRangeInInches(range, "in")).toEqual(result)
  })

  it("should return correct custom size ranges in inches when default values are passed", () => {
    const range: CustomSize = {
      width: [5, "*"],
      height: ["*", 20],
    }
    const result = {
      width: "5-*",
      height: "*-20",
    }

    expect(getCustomSizeRangeInInches(range, "in")).toEqual(result)
  })

  it("should return custom size ranges with default values", () => {
    const range: CustomSize = {
      width: ["*", "*"],
      height: ["*", "*"],
    }
    const result = {
      width: "*-*",
      height: "*-*",
    }

    expect(getCustomSizeRangeInInches(range, "in")).toEqual(result)
  })

  it("should return correct custom size ranges in centimeters", () => {
    const range: CustomSize = {
      width: [5, 10],
      height: [15, 20],
    }
    const result = {
      width: "1.968503937007874-3.937007874015748",
      height: "5.905511811023622-7.874015748031496",
    }

    expect(getCustomSizeRangeInInches(range, "cm")).toEqual(result)
  })

  it("should return correct custom size ranges in centimeters when default values are passed", () => {
    const range: CustomSize = {
      width: ["*", 10],
      height: [15, "*"],
    }
    const result = {
      width: "*-3.937007874015748",
      height: "5.905511811023622-*",
    }

    expect(getCustomSizeRangeInInches(range, "cm")).toEqual(result)
  })
})
