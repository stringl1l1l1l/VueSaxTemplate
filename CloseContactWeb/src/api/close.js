import http from "@/utils/request";

export async function findCloseByMap(map) {
  return http.post('/close/findCloseByMap',map)
}
