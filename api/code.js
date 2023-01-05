import uri from "../static/uri/uri";

export function api(request,service,data,token,reference=null) {
  return request({
    // url: uri.service.v2 + "codes.php",
    url: uri.service.server + service,
    method: 'post',
    config: {
      proxyHeaders: false,
      credentials: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': token
      },
    },
    ///TODO:should uncomment lines
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'token': token
    },
    data: data
  }).catch(error => {
    if (error.response) {
      if (error.response.status == "403" || error.response.status == 403)
        this.$router.push('/account/login');
      if (error.response.data.error.code == "403" || error.response.data.error.code == 403)
        this.$router.push('/account/login');
    }
  });
}



export function api2(request,service,data,token,reference=null) {

  return request({
    // url: uri.service.v2 + "affiliate-code-create.php",
    url: uri.service.server + service,
    method: 'post',
    config: {
      proxyHeaders: false,
      credentials: false,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': token
      },
    },
    ///TODO:should uncomment lines
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'token': token
    },
    data: data
  }).catch(error => {

  });
}







