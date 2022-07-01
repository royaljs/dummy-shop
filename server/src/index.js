const Koa = require("koa");
const app = new Koa();
const { _onError, _onApplicationError } = require("./error-handler");
const { sequelize } = require("../models");
const bodyParser = require("koa-bodyparser");
require("dotenv").config();
const chalk = require("chalk");
const httpRequestLogger = require("koa-morgan");
const routes = require("./routes");
const Router = require('koa-router');
const router = new Router();
//Product DB 연결
sequelize
  .sync({ force: false }) // false: 초기화시 DB에 이미 존재하는 table을 drop하지 않음
  .then(() => {
    console.log(chalk.green.bold("Dummy Shop DB connected successfully."));
  })
  .catch((error) => {
    console.log(chalk.green.bold("DB connection Error!"));
    console.log(error);
  });

//error handler 설정
app.use(_onError);
app.on("error", _onApplicationError);

app.use(bodyParser());

//HTTP 로거
app.use(httpRequestLogger("dev"));

//Order Service Router 설정
app.use(routes.routes());
app.use(router.allowedMethods());
app.listen(process.env.HTTP_LISTENING_PORT, () => {
  console.log(
    chalk.green.bold(
      `Dummy Shop is running on port:${process.env.HTTP_LISTENING_PORT}`
    )
  );
});
