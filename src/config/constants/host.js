import { getCookie } from '../functions/useCookie';
export const baseUrl = 'http://192.168.1.5:5000';
export const TOKEN = 'ITRANSITION_TOKEN';
const token = getCookie(TOKEN);
export const headers = {
  'Content-type': "application/json;charset=utf-8",
  "Accept": 'application/json',
  "Authorization": token ? `Bearer ${token}` : "",
}