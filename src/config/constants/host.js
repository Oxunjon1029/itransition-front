import { getCookie } from '../functions/useCookie';
export const baseUrl = 'http://localhost:5000';
export const TOKEN = 'ITRANSITION_TOKEN';
const token = getCookie(TOKEN);
export const headers = {
  'Content-type': "application/json;charset=utf-8",
  "Accept": 'application/json',
  "Authorization": token ? `Bearer ${token}` : "",
}