const createError = require("http-errors");
const chalk = require("chalk");

const _onError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let apiError = err;
    if (!err.status || !err.message) {
      apiError = createError(500, "Internal server error");
    }
    ctx.throw(apiError.status, apiError.message);
    ctx.app.emit("error", err, ctx);
  }
};

const _onApplicationError = (err, ctx) => {
  // 추가적인 error handling - console.log, write log file, message another service
  console.error(err);
  console.log(chalk.red.bold("Internal Server Error Occured!"));
};

module.exports = { _onError, _onApplicationError };
