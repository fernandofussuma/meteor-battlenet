Battlenet = {};

OAuth.registerService('battlenet', 2, null, function(query) {

  var accessToken = getAccessToken(query);
  var identity = getIdentity(accessToken);

  return {
    serviceData: {
      id: identity.id,
      accessToken: OAuth.sealSecret(accessToken),
    },
    options: {profile: {name: identity.battletag, battletag: identity.battletag}}
  };
});

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'battlenet'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
    response = HTTP.post(
      "https://" + config.region + ".battle.net/oauth/token", {
        auth: config.clientId + ':' + OAuth.openSecret(config.secret),
        headers: {
          Accept: 'application/json'
        },
        params: {
          grant_type: 'authorization_code',
          code: query.code,
          scope: '',
          redirect_uri: OAuth._redirectUri('battlenet', config)
        }
      });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Battlenet. " + err.message),
                   {response: err.response});
  }
  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Battlenet. " + response.data.error);
  } else {
    return response.data.access_token;
  }
};

var getIdentity = function (accessToken) {
  var config = ServiceConfiguration.configurations.findOne({service: 'battlenet'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  try {
    return HTTP.get(
      "https://" + config.region + ".api.battle.net/account/user", {
        params: {access_token: accessToken}
      }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Battlenet. " + err.message),
                   {response: err.response});
  }
};

Battlenet.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
