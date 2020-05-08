const {
  translate
} = require('../common/translate');

// query params text, from, to
// http://localhost:3000/api/translate?text=你好&from=Zh&to=en
module.exports = async function (context, req) {
  try {
    const data = await translate(req.query);
    context.res = {
      body: data
    };

  } catch (e) {
    context.log(e);
    context.res = {
      status: 400,
      body: {}
    };
  }
};