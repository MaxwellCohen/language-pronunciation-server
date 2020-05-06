const rp = require('request-promise');


const subscriptionKey = process.env.SPEECH_SERVICE_KEY;
if (!subscriptionKey) {
  throw new Error('Environment constiable for your subscription key is not set.');
}
const serviceRegion = process.env.SPEECH_SERVICE_REGION;
if (!serviceRegion) {
  throw new Error('Environment constiable for your service region key is not set.');
}


function token() {
  let options = {
    method: 'POST',
    baseUrl: 'https://' + serviceRegion + '.api.cognitive.microsoft.com/',
    url: 'sts/v1.0/issueToken',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json'
    }
  };
  return rp(options);
}


exports.token = token;