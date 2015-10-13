var site = "inf.pub";
var redirect_resource = "inf.pub/!";
var google_cn_resource = {
  urls: [
    "https://" + site + "/*",
    "http://" + site + "/*",
  ],
  types: ["image", "script", "stylesheet"]
}

chrome.webRequest.onBeforeRequest.addListener(function(info) {
    var u = info.url;
    if (u.indexOf(redirect_resource) == -1 ){
      if (u.indexOf(site)  > 0) {
        u = u.replace(site, "www.google.cn")
      } else {
        u = "//www.google.cn" + u;
      }
    }  
    // console.log("Cat intercepted: " + u);
    return {redirectUrl: u};
  }, google_cn_resource,["blocking"]);


// /url 直接重定向
chrome.webRequest.onBeforeRequest.addListener(function(info) {
    var u = info.url;
    if (u.indexOf('googleapis') > 0) {
      u = u.replace("https://fonts.googleapis.com", 'http://fonts.useso.com');
    }
    // console.log("Cat intercepted: " + u);
    return {redirectUrl: u};
  },
  {
    urls: [
      "https://fonts.googleapis.com/*",
      "http://fonts.googleapis.com/*",
    ],
    types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest","other"]
  },["blocking"]);


chrome.webRequest.onBeforeRequest.addListener(function(info){
  var u = info.url;
  var _urls = u.split("&");
  for(var _item in _urls) {
    _item = _urls[_item];
    if (_item.indexOf("url=") == 0) {
        u = _item.substr(4);
        u = decodeURIComponent(u);
        break;
    }
  }
  // console.log(u);
  return {redirectUrl: u};
}, {
  urls: [
    "https://" + site + "/url*",
    "http://" + site + "/url*"
  ],
  types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest","other"]
}, ['blocking']);