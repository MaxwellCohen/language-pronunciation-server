const {
  translaterate,
} = require('../common/translate');
module.exports = async function (context, req) {
  try {
    const data = await translaterate(req.query);
    context.res = {
      body: data
    };
  } catch(e) {
    context.log(e);
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body'
    };
  }
};