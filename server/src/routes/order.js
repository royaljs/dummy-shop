const Router = require("koa-router");
const router = new Router();
const controller = require("../controllers/api");

/**
 * Shop에 들어온 주문 목록 조회
 * @route GET /orders/:id
 */
router.get("/:id", controller.getOrderList);


module.exports = router;
