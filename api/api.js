const {tts, ttsVoices} = require('./TTS');
const {translaterate, getLanguageSupport, translate} = require('./translate');
const {token} = require('./token');

const express = require('express');
const api = express.Router();


api.get('/tts', (req, res) => {
  res.set('content-type', 'audio/wav');
  res.set('accept-ranges', 'bytes');
  const TTSRequest = tts(req.query.text, req.query.lang, req.query.voice);
  TTSRequest.on('data', (chunk) => {
    res.write(chunk);
  });
  TTSRequest.on('end', () => {
    res.end();
  });
});

api.get('/token', (req, res) => {
  token().then((token) => res.send({token}));
});

// query params text, language, fromScript, toScript
api.get('/translaterate', (req, res) => {
  translaterate(req.query).then(
    (d) => res.send(d),
    (d) => res.send(d));
});

// query params text, from, to
// http://localhost:3000/api/translate?text=你好&from=Zh&to=en
api.get('/translate', (req, res) => {
  const emptyState = {
    translations:[]
  };
  translate(req.query).then(
    (d) => res.send(d),
    (d) => res.send(d));
});

api.get('/ttsVoices', (req, res) => {
  ttsVoices().then((d) => res.send(d));
});

api.get('/languagesSupported', (req, res) => {
  getLanguageSupport().then((d) => res.send(d));
});


api.get('/languageSuportData', (req, res) => {

  const cleanUPName = (Name, Gender, locale) => {
    let name = Name.match(/\((.*), (.*)\)/);
    if(name) {
      locale = locale.split('-')[1];
      return `${name[2]} (${Gender} - ${locale})`;
    }
    return Name;
  };

  Promise.all([ttsVoices(), getLanguageSupport()]).then(([voices, languageSupport]) => {
    // get the voices grouped by languag
    const voiceObject = voices.reduce( (acc, {Name, Gender, ShortName, Locale}) => {
      const lang = Locale.split('-')[0];
      acc[lang] = acc[lang] || [];
      let name = cleanUPName(Name, Gender, Locale);
      acc[lang].push({
        name,
        code: ShortName
      });
      return acc;
    }, {});
    const languageObject = Object.keys(languageSupport.translation).reduce((acc, key) => {
      const simpleLang = key.split('-')[0];
      if(voiceObject[simpleLang]) {
        acc[key] = {
          ...languageSupport.translation[key],
          code:key,
          voices : voiceObject[simpleLang]
        };
      }
      return acc;
    }, {});
    const langArray = Object.values(languageObject);
    res.send(langArray);
  });
});

exports.api = api;
