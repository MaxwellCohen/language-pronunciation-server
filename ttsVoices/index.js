const {
  ttsVoices
} = require('../common/TTS');

module.exports = async function (context) {
  try {
    const data = await ttsVoices();
    context.res = {
      body: data
    };
  } catch (err) {
    context.log(err);
    context.res = {
      status: 400,
      body: {}
    };
  }

};