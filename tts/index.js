const {
  tts
} = require('../common/TTS');

module.exports = async function (context, req) {
  try {

    const TTSRequest = tts(req.query.text, req.query.lang, req.query.voice);
    var buffer = [];
    TTSRequest.on('data', (chunk) => {
      buffer.push(chunk);
    });

    TTSRequest.on('end', () => {
      buffer = Buffer.concat(buffer);
      const bufferString = buffer.toString('base64');
      
      const audio = `data:audio/wav;base64,${bufferString}`;
      context.res = {
        body: audio
      };
      context.done();
    });
    await TTSRequest;



  } catch (e) {
    context.res = {
      
      body: e
    };
  }
};