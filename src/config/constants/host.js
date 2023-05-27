import { getCookie } from '../functions/useCookie';
export const baseUrl = 'https://itransition-fullstack-app.df.r.appspot.com';
export const TOKEN = 'ITRANSITION_TOKEN';
const token = getCookie(TOKEN);
export const headers = {
  'Content-type': "application/json;charset=utf-8",
  "Accept": 'application/json',
  "Authorization": token ? `Bearer ${token}` : "",
}