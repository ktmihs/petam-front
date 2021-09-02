import client from './client';

// 로그인
export const login = ({ username, password }) => 
  // var res =
    client.post('/api/auth/login', { username, password });
  // export const hlogin = ({ username, password }) =>
    // client.post('/api/hospitals/hlogin', { username, password });
     export const hlogin = ({ company_number, password }) =>
       client.post('/api/hospitals/hlogin', { company_number, password });
  // console.log(res)
// console.log("--------", login)

// if (!login) {
//   export const login = ({ username, password }) =>
//     client.post('api/hospitals/hlogin', {username, password});
// }
// 개인 회원가입
export const register = ({ username, password, name, email, phone }) =>
  client.post('/api/auth/register', { username, password, name, email, phone });

// 병원 회원가입
// 운영시간, 점심시간 넣어야 함.
export const hregister = ({
  username,
  password,
  name,
  newAddr,
  company_number,
  oldAddr,
  zipCode,
  tel,
  openHour,
  openMinute,
  closeHour,
  closeMinute,
  lunchOpenHour,
  lunchOpenMinute,
  lunchCloseHour,
  lunchCloseMinute,
}) =>
  client.post('/api/hospitals/hregister', {
    username,
    password,
    newAddr,
    company_number,
    oldAddr,
    zipCode,
    name,
    tel,
    openHour,
    openMinute,
    closeHour,
    closeMinute,
    lunchOpenHour,
    lunchOpenMinute,
    lunchCloseHour,
    lunchCloseMinute,
  });
// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');
export const hcheck = () => client.get('/api/hospitals/hcheck');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');
export const hlogout = () => client.post('/api/hospitals/hlogout');