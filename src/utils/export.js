import { AUTH_COOKIE } from '../constants/Auth';
import Cookie from 'js-cookie';

export default function getExportURL (survey) {
    const token = Cookie.get(AUTH_COOKIE);
    return API_ROOT+'/survey/'+survey.id+'/response/csv?auth='+token;
}
