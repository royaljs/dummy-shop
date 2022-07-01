const Router = require("koa-router");
const router = new Router();
const shop = require("./shop");
const product = require("./product");
const image = require("./image");
const order = require("./order");

router.get("/", async (ctx, next) => {
    ctx.body = "HTTP Method, URI를 확인 하세요";
    await next();
  });
  
//Product API
router.use("/products", product.routes());

//shops API
router.use("/shops", shop.routes());

//Iamge 서버 API
router.use("/images", image.routes());

//Order API
router.use("/orders", order.routes());

module.exports = router;
