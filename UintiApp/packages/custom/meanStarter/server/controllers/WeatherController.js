'use strict';

var restify = require('restify');

function getJSONDataFromUrl(place){
  var client = restify.createStringClient({
    url: 'http://data.fmi.fi'
  });


  client.get('/fmi-apikey/'+config.fmiKey+'/wfs?request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&parameters=temperature&place='+place, function(error, request, response, data) {
    //assert.ifError(err);
    console.log('%s', data);
    return data;
    //return res.send(data);
  });
}
