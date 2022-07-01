const Router = require("koa-router");
const router = new Router();
const controller = require("../controllers/api");

/**
 * Shop 조회
 * @route GET /shop/:id
 */
router.get("/:id", controller.getShop);

/**
 * 모든 Shop 조회
 * @route GET /shop
 */
router.get("/", controller.getShopList);

/**
 * Shop의 모든 상품 목록 조회
 * @route GET /shop/:id/product
 */
router.get("/:id/product", controller.getProductListByShopId);

/**
 * Shop 생성
 * @route POST /shop
 */
router.post("/", controller.createShop);

/**
 * Shop 수정
 * @route POST /shop/:id
 */
router.post("/", controller.updateShop);

/**
 * Shop 삭제
 * @route POST /shop/:id
 */
router.post("/", controller.deleteShop);

/**
 * Shop에 주문 요청(선불/후불 주문 모두 처리)
 * @route POST /shop/:id/approve
 */
router.post("/:id/approve", controller.approveOrder);

module.exports = router;
