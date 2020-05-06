// To install dependencies, run: npm install
const xmlbuilder = require('xmlbuilder');
// request-promise has a dependency on request
const rp = require('request-promise');


function makebaseobject(options, header) {
  const subscriptionKey = process.env.SPEECH_SERVICE_KEY;
  const serviceRegion = process.env.SPEECH_SERVICE_REGION;
  const baseURL = `https://${serviceRegion}.tts.speech.microsoft.com/`;

  return {
    baseUrl: baseURL,
    ...options,
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'User-Agent': 'YOUR_RESOURCE_NAME',
      ...header,
    }
  }
}



function tts(text, lang, voice) {
  // Create the SSML request.
  const xml_body = xmlbuilder.create('speak')
    .att('version', '1.0')
    .att('xml:lang', lang)
    .ele('voice')
    .att('xml:lang', lang)
    .att('name', voice)
    .txt(text)
    .end();
  // Convert the XML into a string to send in the TTS request.
  const body = xml_body.toString();


  return rp(makebaseobject({
    method: 'POST',
    url: 'cognitiveservices/v1',
    body
  }, {
    'cache-control': 'no-cache',
    'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
    'Content-Type': 'application/ssml+xml'
  }));

}

function ttsVoices() {
  return rp(makebaseobject({
    method: 'GET',
    url: '/cognitiveservices/voices/list',
    json: true,
  }, {
    'Content-Type': 'application/json',
  }));
}

exports.ttsVoices = ttsVoices;
exports.tts = tts;
