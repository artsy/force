/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

var APPLICATION_NAME = require('./config').APPLICATION_NAME,
    NEW_RELIC_LICENSE_KEY = require('./config').NEW_RELIC_LICENSE_KEY;

exports.config = {
  /**
   * Array of application names.
   */
  app_name : [APPLICATION_NAME],
  /**
   * Your New Relic license key.
   */
  license_key : NEW_RELIC_LICENSE_KEY,
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'trace'
  }
};
