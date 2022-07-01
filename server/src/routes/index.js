const Router = require("koa-router");
const router = new Router();
const shop = require("./shop");
const product = require("./product");

router.get("/", async (ctx, next) => {
    ctx.body = "HTTP Method, URI를 확인 하세요";
    await next();
  });
  

//상품 정보 CRUD
router.use("/product", product.routes());

//Dummy Shop의 모든 상품 목록
router.use("/shop", shop.routes());


module.exports = router;
