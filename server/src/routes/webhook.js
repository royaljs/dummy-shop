const Router = require("koa-router");
const router = new Router();
const controller = require("../controllers/webhook");

router.post("/", controller.webhookHandler);

module.exports = router;
