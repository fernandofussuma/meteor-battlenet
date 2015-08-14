Template.configureLoginServiceDialogForBattlenet.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForBattlenet.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client Secret'},
    {property: 'region', label: 'Region (cn not supported)'}
  ];
};
