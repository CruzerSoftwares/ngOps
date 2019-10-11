/**
 * A model that will be used for authentication services
 *
 * @category ACL
 * @package ManageACL
 * @author RN Kushwaha <ram.kushwaha@cardekho.com>
 * @copyright CARDEKHO
 * @version 1.0.0
 * @since version 1.0.0
 */

export class User {
    public id: number;
    public be_id: number;
    public role_group_id: number;
    public suite_id: number;
    public role_id: number;
    public user_name: string;
    public password: string;
    public first_name: string;
    public last_name: string;
    public avatar: string;
    public email: string;
    public phone: string;
    public token?: string;
    public selected: boolean;
    public status : number;
    public statusTxt : string;
    public created_at: Date;
    public updated_at: Date;
}