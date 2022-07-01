const Router = require("koa-router");
const router = new Router();
const controller = require("../controllers/api");
const multer = require("@koa/multer");
const uuid = require("uuid"); // v4 random uuid 사용
const path = require("path");

/**
 * 이미지 조회
 * @route GET /images/:id
 */
router.get("/:id", controller.getImage);

/**
 * 상품에 대한 이미지 목록 조회
 * @route GET /images/product/:id
 */
router.get("/product/:id", controller.getImageListByProductId);

/**
 * Shop에 대한 이미지 목록 조회
 * @route GET /images/shop/:id
 */
router.get("/shop/:id", controller.getImageListByShopId);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});

/**
 *  상품 이미지 업로드
 * @route POST /images/product/:id
 */
router.post(
  "/product/:id",
  upload.array(
    "image",
    10 //한번에 최대 10개의 이미지 업로드 가능
  ),
  controller.uploadProductImage
);

/**
 *  Shop 이미지 업로드
 * @route POST /images/shop/:id
 */
router.post(
  "/shop/:id",
  upload.array(
    "image",
    10 //한번에 최대 10개의 이미지 업로드 가능
  ),
  controller.uploadShopImage
);

/**
 * 이미지 삭제
 * @route POST /images/:id
 */
router.post("/:id/delete", controller.deleteImage);

module.exports = router;
