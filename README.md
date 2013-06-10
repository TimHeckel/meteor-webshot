###Webshot - Meteor Smart Package

This is a the [node-webshot npm plugin](https://npmjs.org/package/webshot) as a meteor smart package.

###How to install?

1. Install [meteorite](https://github.com/oortcloud/meteorite)
2. `mrt add bootboxjs`

###How to use?

You can use webshot to easily grab screenshots within Meteor. Below is a simple guide to snapping a URL with Meteor, saving the file to a local directory, then optionally prompt the user to download the image using `meteor-router` and changing the mime type of the page in a server side route.

1. Ensure you have an image directory with a `~` so that the Meteor framework does not reload the app on file change.
	`mkdir public/~exports`

2. Use the `WEBSHOT` plugin in here

		var _image = "myscreenshot.png";
		var _res =  WEBSHOT.snap("http://url_to_capture", "public/exports~/" + _image, {
				screenSize: {
					width: 300
					, height: 300
				});

	See the [API documentation](https://npmjs.org/package/webshot) for complete list of `options`

3. Finally, to prompt the user to download the image, you can use [meteor-router](https://github.com/tmeasday/meteor-router) thusly:

	`mrt add router`
	
	Add this **server** side route (in server code)

			Meteor.Router.add("/render/:id", "GET", function(_image) {
				var fs = Npm.require("fs")
					, Future = Npm.require("fibers/future")
					, future = new Future
					, cb = future.resolver();
	
				fs.readFile("public/exports~/" + _image, cb);
				var _read = future.wait();
	
				fs.unlink('public/exports~/' + _image, function (err) {
				  if (err) throw err;
				});
	
				this.response.setHeader("Content-Type", "application/octet-stream");
				return [_read];
			});

	Once you've called the `WEBSHOT.snap` (step 2), redirect the user to the server side route to prompt the download:

			window.location.href = "/render/" + _image;
