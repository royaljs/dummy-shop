const createError = require("http-errors");
const models = require("../../models");
const uuid = require("uuid"); // v4 random uuid 사용

/**
 *
 * Product API
 */
const getProduct = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    const product = await models.Product.findOne({
      where: {
        id: id,
      },
    });
    ctx.body = product;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const getProductList = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    const product = await models.Product.findAll();
    ctx.body = product;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const createProduct = async (ctx, next) => {
  try {
    const requestBody = ctx.request.body;
    const product = await models.Product.create({
      id: uuid.v4(),
      shop_id: requestBody.shop_id,
      name: requestBody.name,
      price: requestBody.price,
      description: requestBody.description,
    });
    ctx.body = product;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const updateProduct = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    const requestBody = ctx.request.body;
    await models.Product.update(
      {
        //id, shop_id는 변경 불가
        name: requestBody.name,
        price: requestBody.price,
        description: requestBody.description,
      },
      {
        where: {
          id: id,
        },
      }
    );
    const product = await models.Product.findOne({
      where: {
        id: id,
      },
    });
    ctx.body = product;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const deleteProduct = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    await models.Product.destroy({
      where: {
        id: id,
      },
    });
    ctx.body = "상품 정보 삭제 완료";
  } catch (err) {
    throw createError(400, err.message);
  }
};

/**
 *
 * Shop API
 */
const getShop = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    const shop = await models.Shop.findOne({
      where: {
        id: id,
      },
    });
    ctx.body = shop;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const getShopList = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    const shop = await models.Shop.findAll();
    ctx.body = shop;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const getProductListByShopId = async (ctx, next) => {
  try {
    const shop_id = ctx.request.params.id;
    const productList = await models.Product.findAll({
      where: {
        shop_id: shop_id,
      },
    });
    ctx.body = productList;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const createShop = async (ctx, next) => {
  try {
    const requestBody = ctx.request.body;
    const shop_id = uuid.v4();
    const shop = await models.Shop.create({
      id: shop_id,
      name: requestBody.name,
      is_pay_later_allowed: requestBody.is_pay_later_allowed,
      address: requestBody.address,
      contact_number: requestBody.contact_number,
      contact_email: requestBody.contact_email,
      description: requestBody.description,
    });
    ctx.body = shop;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const updateShop = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    const requestBody = ctx.request.body;
    await models.Shop.update(
      {
        //id는 변경 불가
        name: requestBody.name,
        is_pay_later_allowed: requestBody.is_pay_later_allowed,
        address: requestBody.address,
        contact_number: requestBody.contact_number,
        contact_email: requestBody.contact_email,
        description: requestBody.description,
      },
      {
        where: {
          id: id,
        },
      }
    );
    const shop = await models.Shop.findOne({
      where: {
        id: id,
      },
    });
    ctx.body = shop;
  } catch (err) {
    throw createError(400, err.message);
  }
};

const deleteShop = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    //Sequelize Transaction 생성
    await models.sequelize.transaction(async (transaction) => {
      //Shop 삭제
      await models.Shop.destroy({
        where: {
          id: id,
        },
        transaction,
      });
      //Shop에 포함된 Product 삭제
      await models.Product.destroy({
        where: {
          shop_id: id,
        },
        transaction,
      });
    });
    ctx.body = "Shop과 Shop에 포함된 매장이 삭제되었습니다.";
  } catch (err) {
    throw createError(400, err.message);
  }
};

/**
 * 현재는 /shop/:id/appove 로 주문 승인 요청 API가 호출되면,
 * Dummy Shop 서버에서 즉시 approve/decline 응답을 한다.
 * 
 * TODO:
 * 1. Shop마다 승인 요청 받은 주문 내역을 저장할 Order DB를 추가한다.
 * 2. 이 API(approveOrder)의 응답은 요청이 정상적으로 전달되었다는 메시지로 대체한다.
 * 3. Shop에 들어온 요청을 승인/거절 할 수 있는 Dummy Shop Dashboard 페이지를 개발한다.
 * 4. Dummy Shop Dashboard에서 승인/거절하면 Order 객체의 상태를 바꾸고, 
 * 이 Order 객체의 상태를 polling으로 관찰할 Dummy Shop Library를 개발한다.
 */
const approveOrder = async (ctx, next) => {
  try {
    const id = ctx.request.params.id;
    const shop = await models.Shop.findOne({
      where: {
        id: id,
      },
    });
    const requestBody = ctx.request.body;
    // 선불 주문인 경우(결제까지 완료된 주문)
    if (!requestBody.pay_later) {
      ctx.body = {
        status: "approve",
        approve_id: uuid.v4(),
        desc: "Shop에서 해당 주문을 승인했습니다.",
      };
    } else {
      // 후불 주문인 경우
      if (!shop.get("is_pay_later_allowed")) {
        // Shop이 후불 미지원
        ctx.body = {
          status: "decline",
          decline_id: uuid.v4(),
          desc: "후불 결제가 지원되지 않는 Shop 입니다.",
        };
      } else {
        // Shop이 후불 지원
        ctx.body = {
          status: "approve",
          approve_id: uuid.v4(),
          desc: "Shop에서 해당 후불 주문을 승인했습니다.",
        };
      }
    }
  } catch (err) {
    throw createError(400, err.message);
  }
};

module.exports = {
  //Product API
  getProduct,
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,

  //Shop API
  getShop,
  getShopList,
  getProductListByShopId,
  createShop,
  updateShop,
  deleteShop,
  approveOrder,
};
