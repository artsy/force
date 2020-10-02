const v2Config = require("./jest.config.v2").projects[0]
const v1Config = require("./jest.config.v1").projects[0]

module.exports = {
  projects: [v2Config, v1Config], // this order is necessary
}
