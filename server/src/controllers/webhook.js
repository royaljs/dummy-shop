const createError = require("http-errors");
const models = require("../../models");
const uuid = require("uuid"); // v4 random uuid 사용
const axios = require("axios");

const approveOrder = async (ctx, next) => {
  let isDuplicate = false;
  try {
    const requestBody = ctx.request.body;
    await models.Order.findOne({
      where: {
        id: requestBody.order_id,
      },
    })
      .then(async (data) => {
        if (data) {
          isDuplicate = true;
          ctx.body = "Shop에서 해당 주문을 승인 대기중입니다.";
        }
      })
      .catch((err) => console.log(err));

    //중복 승인 요청
    if (isDuplicate) {
      return;
    }

    //최초 승인 요청
    await models.Order.create({
      id: requestBody.order_id,
      user_id: requestBody.user_id,
      shop_id: requestBody.shop_id,
      total_amount: requestBody.total_amount,
      price_amount: requestBody.price_amount,
      tax_amount: requestBody.tax_amount,
      discount_amount: requestBody.discount_amount,
      description: requestBody.description,
    });
    if (requestBody.items) {
      for (item of requestBody.items) {
        await models.Item.create({
          id: uuid.v4(),
          order_id: requestBody.order_id,
          product_id: item.product_id,
          name: item.name,
          total_amount: item.total_amount,
          price_amount: item.price_amount,
          tax_amount: item.tax_amount,
          discount_amount: item.discount_amount,
          quantity: item.quantity,
        });
      }
    }
    ctx.body = "Shop에 해당 주문이 요청되었습니다.";
  } catch (err) {
    throw createError(400, err.message);
  }
};

const webhookHandler = async (ctx, next) => {
  try {
    const requestBody = ctx.request.body;
    //주문 승인 처리
    if (requestBody.type == "approval_request") {
      await approveOrder(ctx, next);
    }
  } catch (err) {
    throw createError(400, err.message);
  }
};

module.exports = {
  webhookHandler,
};
