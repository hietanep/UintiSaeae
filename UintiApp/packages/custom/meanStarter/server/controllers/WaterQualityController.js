'use strict';

exports.getWaterQuality = function(location) {
  var qualityWaters = getCleanWaters(location);

  return qualityWaters;
};

function getCleanWaters(location) {
  var waterQuality = {};

  var client = restify.createStringClient({
    url: 'rajapinnat.ymparisto.fi/api/kasviplanktonrajapinta/1.0/odata'
  });

  client.get('/AlgaBloomObservation?$top=20&$filter=Municipal eq' + location + 'and AlgaBloomIntensity/AlgaBloomIntensity_Id eq 0 and Toxicity/Tox_Id le 2', function(err, req, res, data) {
    waterQuality = data;
  });

  return waterQuality;

}
