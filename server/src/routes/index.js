const Router = require("koa-router");
const router = new Router();
const shop = require("./shop");
const product = require("./product");
const image = require("./image");

router.get("/", async (ctx, next) => {
    ctx.body = "HTTP Method, URI를 확인 하세요";
    await next();
  });
  
//Product API
router.use("/product", product.routes());

//Shop API
router.use("/shop", shop.routes());

//Iamge 서버 API
router.use("/images", image.routes());

module.exports = router;
