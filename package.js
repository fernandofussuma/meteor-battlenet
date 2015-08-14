Package.describe({
  name: 'fernandofussuma:battlenet',
  version: '0.0.2',
  summary: 'Battlenet Oauth flow',
  git: 'https://github.com/fernandofussuma/meteor-battlenet.git',
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
