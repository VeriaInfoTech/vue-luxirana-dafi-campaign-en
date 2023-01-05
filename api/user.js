import uri from "../static/uri/uri";

export function api(request,service,data,reference=null) {
  return request({
    url: uri.service.server + service,
    // url: uri.service.v3 + service,
    // url: uri.service.v2 + "login.php",
    // url: uri.service.v2 + "update.php",
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

export function apiToken(request,service,data,token,reference=null) {
  return request({
    url: uri.service.server + service,
    // url: uri.service.v3 + service,
    // url: uri.service.v2 + "login.php",
    // url: uri.service.v2 + "profile.php",
    // url: uri.service.v2 + "update.php",
    method: 'post',
    config: {
      proxyHeaders: false,
      credentials: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': token
      },
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'token': token
    },
    data: data
  });
}
