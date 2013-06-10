var Future = Npm.require("fibers/future")
  , _webshot = Npm.require("webshot");

WEBSHOT = {
  snap: function (url, pathToPng, options) {
  	var future = new Future
  		, cb = future.resolver();
  		
    _webshot(url, pathToPng, options, cb);
    future.wait();
    return true;
  }
};