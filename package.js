Package.describe({
  name: 'fernandofussuma:battlenet',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Battlenet Oauth flow',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/fernandofussuma/meteor-battlenet.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'client');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Battlenet');

  api.addFiles(['battlenet_configure.html', 'battlenet_configure.js'], 'client');

  api.addFiles('battlenet_server.js', 'server');
  api.addFiles('battlenet_client.js', 'client');

});
