'use strict';

// pull in the required packages.
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
// replace with your own subscription key,
// service region (e.g., "westus"), and
// the name of the file you save the synthesized audio.
const subscriptionKey = process.env.SPEECH_SERVICE_KEY;
if (!subscriptionKey) {
  throw new Error('Environment constiable for your subscription key is not set.');
}
const serviceRegion = process.env.SPEECH_SERVICE_REGION;
if (!serviceRegion) {
  throw new Error('Environment constiable for your service region key is not set.');
}

function createPushStream(fileName) {
  // Create the push stream we need for the speech sdk.
  const pushStream = sdk.AudioInputStream.createPushStream();

  // Open the file and push it to the push stream.
  fs.createReadStream(fileName).on('data', function (arrayBuffer) {
    pushStream.write(arrayBuffer.buffer);
  }).on('end', function () {
    pushStream.close();
  });

  // now create the audio-config pointing to our stream and
  // the speech config specifying the language.
  return sdk.AudioConfig.fromStreamInput(pushStream);
} 

function stt(audioConfig, speechLanguage, translateLangue, cb) {

  const speechConfig = sdk.SpeechTranslationConfig.fromSubscription(subscriptionKey, serviceRegion);

  // setting the recognition language to English.
  speechConfig.speechRecognitionLanguage = speechLanguage;
  speechConfig.addTargetLanguage(translateLangue);

  // Create the speech recognizer.
  // const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  const recognizer = new sdk.TranslationRecognizer(speechConfig, audioConfig);

  // Start the recognizer and wait for a result.
  recognizer.recognizeOnceAsync(
    function (result) {

      console.log(result);
      cb(null, {
        text: result.privText,
        // translation: result.privTranslations.privMap.getProperty(translateLangue.substring(0,2)) || ''
      });

      recognizer.close();
    },
    function (err) {
      cb(err, {});
      recognizer.close();
    });
}

exports.stt = stt;
exports.createPushStream = createPushStream;

