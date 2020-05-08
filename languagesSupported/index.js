const {getLanguageSupport} = require('../common/translate');

module.exports = async function (context) {
  try {
    const data = await getLanguageSupport();
    context.res = {
      body: data
    };
  } catch(err) {
    context.log(err);
    context.res = {
      status: 400,
      body: {}
    };
  }
};