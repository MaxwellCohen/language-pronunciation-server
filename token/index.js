const {
  token
} = require('../common/token');

module.exports = async function (context) {

  try {
    const d = await token();
    context.res = {
      body: {token:d}
    };
  } catch (e) {
    context.log(e);
    context.res = {
      status: 400,
      body: {token:null}
    };
  }
};