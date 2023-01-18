import axios from "_axios@0.18.1@axios";
import qs from "_qs@6.10.3@qs";

const service = axios.create({
  timeout: 100000 // request timeout
})

const curHttp =
{
  get(url, params) {
    return service.get(url, {
      params: params,
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    })
  }
}
export async function findUp2DateEpidemicData() {
  return curHttp.get('/api/g2/getOnsInfo?name=disease_other')
}

export async function addr2Point(addr) {
  return curHttp.get('/baidu/geocoding/v3/', {
    address: addr,
    output: 'json',
    ak: 'evnG4fEHVZ0D0N20upNhAFjaIv29hWfY'
  })
}
