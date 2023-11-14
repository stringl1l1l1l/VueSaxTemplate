import http from '@/utils/request'

export async function login(data) {
  return http.post('/login', data)
}

export async function getInfo(token) {
  return http.getRestApi('/user/getUserInfo', token)
}

export async function getUserRoles(token) {
  return http.getRestApi('/user/getUserRoles', token)
}

export async function getUserRolesById(id) {
  return http.getRestApi('/user/getUserRolesById', id)
}
export async function findAllUsers() {
  return http.get('/user/findAllUsers')
}
export async function logout() {
  return http.get('/logOut')
}

export async function findUsersByMap(map) {
  return http.post('/user/findUsersByMap',map)
}

export async function updateUserById(user) {
  return http.put('/user/updateUserById',user)
}
