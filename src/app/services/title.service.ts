/**
 * Define all the aplication level functions
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})

export class TitleService {
  title = ' - ngOPS';
  constructor(private ts: Title) {
  }

  setTitle(title: string) {
    this.ts.setTitle(title+this.title);
  }

}
