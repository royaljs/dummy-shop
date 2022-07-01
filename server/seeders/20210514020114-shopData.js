"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "shop_table",
      [
        {
          id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
          name: "스타벅스",
          is_pay_later_allowed: true,
          address: "경기도 성남시 분당구 성남대로151",
          contact_number: "031-1522-3232",
          contact_email:"star@bucks.co.kr",
          description: "스타벅스 미금역사거리점"
        },
        {
          id: "12950ae2-767b-4671-81fa-09159349918e",
          name: "울프강 스테이크 하우스",
          is_pay_later_allowed: true,
          address: "서울특별시 강남구 선릉로152길 21",
          contact_number: "0507-1486-8700",
          contact_email:"wolfgang@steak.co.kr",
          description: "티본스테이크가 맛있는 레스토랑"
        },
        {
          id: "20d9e08e-b3d1-43e3-a3c9-5ec771c5abb8",
          name: "터닝포인트짐",
          is_pay_later_allowed: false,
          address: "경기도 성남시 분당구 성남대로51 분당포스빌오피스텔",
          contact_number: "031-782-9229",
          contact_email:"turning@point.co.kr",
          description: "오리역 일대 최고의 헬스장"
        },
        {
          id: "59ac2672-58f9-4f9f-a553-a9ed82140a61",
          name: "고디바",
          is_pay_later_allowed: false,
          address: "서울특별시 강남구 테헤란로521 파르나스타워",
          contact_number: "",
          contact_email:"godiva@google.com",
          description: "초콜릿 전문점"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
