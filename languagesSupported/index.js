const {getTranslateEnvVars, getLanguageSupport} = require('..common//translate');

module.exports = async function (context) {
  try {
    const {endpoint, subscriptionKey} = getTranslateEnvVars();
    const data = await getLanguageSupport(endpoint, subscriptionKey);
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