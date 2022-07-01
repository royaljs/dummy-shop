const Router = require("koa-router");
const router = new Router();
const controller = require("../controllers/api");

/**
 * 상품 조회
 * @route GET /product/:id
 */
router.get("/:id", controller.getProduct);

/**
 * 모든 상품 조회
 * @route GET /product
 */
router.get("/", controller.getProductList);

/**
 * 상품 생성
 * @route POST /product
 */
router.post("/", controller.createProduct);

/**
 * 상품 수정
 * @route POST /product/:id
 */
router.post("/:id", controller.updateProduct);

/**
 * 상품 삭제
 * @route POST /product/:id
 */
router.post("/:id", controller.deleteProduct);

module.exports = router;
