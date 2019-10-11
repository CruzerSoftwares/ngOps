/**
 * Define all the aplication level environment variables
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
  // The values that are defined here are the default values that can
  // be overridden by env.js

  public envFileLoaded = true;

  // API url
  public apiUrl = '';
  public appUrl = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  constructor() {
  }

}