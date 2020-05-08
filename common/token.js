const rp = require('request-promise');
const {getSpeechEnvVars} = require('./checkEnvVars');

function token() {
  const {subscriptionKey, serviceRegion} = getSpeechEnvVars();
  let options = {
    method: 'POST',
    baseUrl: `https://${ serviceRegion }.api.cognitive.microsoft.com/`,
    url: 'sts/v1.0/issueToken',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json'
    }
  };
  return rp(options);
}


exports.token = token;