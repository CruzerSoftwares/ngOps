(function (window) {
  /**
   * All the variables written here will overwrite the environment variables.
   * This makes environment variables available on per server basis. 
   * If you make any change there is no need to make new builds
   * as the system reads variables directly from it.
   * It also means if you deploy the application you can safely change these varaibles
   * and these will be available on your server.
   * If anything is not there it will read from environment files
   * 
   * @category ACL
   * @package ManageACL
   * @author RN Kushwaha <ram.kushwaha@cardekho.com>
   * @copyright CARDEKHO
   * @version 1.0.0
   * @since version 1.0.0
   */
  window.__env = window.__env || {};

  // Default API url based on environment
  window.__env.apiUrl = 'http://127.0.0.1:3000/';
  window.__env.appUrl = 'http://localhost:4200/';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));