import uri from "../static/uri/uri";

export function api(request,service,data,reference=null) {

  return request({
    url: uri.service.server + service,
    method: 'post',
    config: {
      proxyHeaders: false,
      credentials: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    data: data
  });
}

export function api2(request,service,data,reference=null) {


  return request({
    url: uri.service.server + service,
    // url: uri.service.v2 + "verify.php",
    method: 'post',
    config: {
      proxyHeaders: false,
      credentials: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    data: data
  });
}
