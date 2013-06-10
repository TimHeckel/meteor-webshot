Package.describe({
  summary: "Webshot - NPM Screenshot Library using PhantomJS, repackaged For Meteor"
});

Npm.depends({webshot: "0.5.0"});

Package.on_use(function (api) {
  api.add_files("lib/webshot.js", "server");
});