const Router = require("koa-router");
const router = new Router();
const controller = require("../controllers/api");

/**
 * Shop 조회
 * @route GET /shops/:id
 */
router.get("/:id", controller.getShop);

/**
 * 모든 Shop 조회
 * @route GET /shops
 */
router.get("/", controller.getShopList);

/**
 * Shop의 모든 상품 목록 조회
 * @route GET /shops/:id/product
 */
router.get("/:id/product", controller.getProductListByShopId);

/**
 * Shop에 들어온 주문 목록 조회
 * @route GET /shops/:shop_id/orders
 */
 router.get("/:id/orders", controller.getOrderList);

/**
 * Shop에 들어온 특정주문 조회
 * @route GET /shops/:id/orders/:order_id
 */
 router.get("/:id/orders/:order_id", controller.getOrder);

/**
 * Shop 생성
 * @route POST /shops
 */
router.post("/", controller.createShop);

/**
 * Shop 수정
 * @route POST /shops/:id
 */
router.post("/", controller.updateShop);

/**
 * Shop 삭제
 * @route POST /shops/:id
 */
router.post("/", controller.deleteShop);

/**
 * Shop에 주문 승인 처리(선불/후불 주문 모두 처리)
 * @route POST /shops/:id/orders/:order_id/approve
 */
router.post("/:id/orders/:order_id/approve", controller.approveOrder);

/**
 * Shop에 주문 거절 처리(선불/후불 주문 모두 처리)
 * @route POST /shop/:id/orders/:order_id/approve
 */
 router.post("/:id/orders/:order_id/decline", controller.declineOrder);

module.exports = router;
