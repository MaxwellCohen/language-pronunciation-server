const {
  v4: uuidv4
} = require('uuid');
const rp = require('request-promise');
const get = require('lodash/get');
const {getTranslateEnvVars} = require('./checkEnvVars');



function translaterate({
  text,
  language,
  fromScript,
  toScript
}) {
  const {
    endpoint,
    subscriptionKey
  } = getTranslateEnvVars();
  if (!text || !language || !fromScript || !toScript) {
    return Promise.reject();
  }

  let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'transliterate',
    qs: {
      'api-version': '3.0',
      language,
      fromScript,
      toScript
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
      text
    }],
    json: true,
  };

  return rp(options).then(b => ({
    transliteration: b && b[0] && b[0].text
  }));
}

function translate({
  text,
  from,
  to
}) {

  const {
    endpoint,
    subscriptionKey
  } = getTranslateEnvVars();
  if (!text || !from || !to) {
    return Promise.reject();
  }

  let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'from': from,
      'to': [from, to],
      'toScript': ['Latn', 'Latn']
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
      'text': text
    }],
    json: true,
  };

  return rp(options).then((data) => ({
    text: get(data, '[0]translations[0].text', null),
    textTransliteration: get(data, '[0]translations[0].transliteration.text', null),
    translation: get(data, '[0]translations[1].text', null),
    translationTransliteration: get(data, '[0]translations[1].transliteration.text', null),
  }), () => ({
    text: null,
    textTransliteration: null,
    translation: null,
    translationTransliteration: null,
  }));
}

function getLanguageSupport() {
  const {
    endpoint,
    subscriptionKey
  } = getTranslateEnvVars();
  let options = {
    method: 'GET',
    baseUrl: endpoint,
    url: 'languages',
    qs: {
      'api-version': '3.0',
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    json: true,
  };
  return rp(options);
}

exports.getTranslateEnvVars = getTranslateEnvVars;
exports.translate = translate;
exports.getLanguageSupport = getLanguageSupport;
exports.translaterate = translaterate;