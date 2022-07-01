'use strict';

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
    "image_table",
    [
      { //아메리카노
        id: "ec370700-474a-43b1-8fc4-257943f1706b",
        product_id: "df9a2afe-6ce0-4797-9be3-3654e42a3dea",
        filename: "ec370700-474a-43b1-8fc4-257943f1706b.png"
      },
      { //더치라떼
        id: "5ac77a91-9b4e-4043-acaf-3167b0e7a105",
        product_id: "de46e11a-6548-415f-b9e5-917db2904554",
        filename: "5ac77a91-9b4e-4043-acaf-3167b0e7a105.png"
      },
      { //연유라떼
        id: "54b9c1ac-51ac-4283-b1ec-cdd6b1fe18f5",
        product_id: "ca59bde4-b430-47d4-a31a-0e4ec39d7df8",
        filename: "54b9c1ac-51ac-4283-b1ec-cdd6b1fe18f5.jpg"
      },
      { //카라멜 마끼아또
        id: "61b99fbf-5738-4a44-b82b-f5194b3e072c",
        product_id: "1dc4282e-d27b-4816-a3cd-7373aaa25584",
        filename: "61b99fbf-5738-4a44-b82b-f5194b3e072c.jpg"
      },
      { //딸기 스무디
        id: "3eb4e8fc-984d-4242-95dd-18aae5aa53ee",
        product_id: "c22e1f65-1139-4565-a1b4-05c55289e43e",
        filename: "3eb4e8fc-984d-4242-95dd-18aae5aa53ee.jpg"
      },
      { //마들렌
        id: "c93f4fb7-f2c9-4d5c-b9a3-dc3e4c0eb759",
        product_id: "38136f00-d2f5-4114-a7a6-0a426feafdfc",
        filename: "c93f4fb7-f2c9-4d5c-b9a3-dc3e4c0eb759.jpg"
      },
      { //포터하우스 스테이크(1000g)
        id: "5c2e0257-729d-4e38-ba47-232d523c633a",
        product_id: "118ed484-d513-4208-9cd4-1ca83875351c",
        filename: "5c2e0257-729d-4e38-ba47-232d523c633a.jpg"
      },
      { //더블유 코스(1인)
        id: "7164ad0f-b38f-4ba4-a76d-5cae71b6b91c",
        product_id: "75bdf1b8-1bb7-4065-8ab9-06e9bfdf3e9e",
        filename: "7164ad0f-b38f-4ba4-a76d-5cae71b6b91c.jpg"
      },
      { //클래식 코스(1인)
        id: "541acdc6-7316-41e1-aa0c-2e1be4da1c3f",
        product_id: "d57c4fc6-49d2-4e60-8f72-974b4afaf85c",
        filename: "541acdc6-7316-41e1-aa0c-2e1be4da1c3f.jpg"
      },
      { //런치 코스(1인)
        id: "65cd6bcb-1025-422f-82f4-4677e8312e6b",
        product_id: "7120d4eb-554c-4625-aea1-e5e9d1826778",
        filename: "65cd6bcb-1025-422f-82f4-4677e8312e6b.jpg"
      },
      { //플레이티드 어니언
        id: "ae571e45-fbc6-4632-a1f6-7d79adf4841e",
        product_id: "18a6b714-ed9c-4f95-af90-e58dc9605ace",
        filename: "ae571e45-fbc6-4632-a1f6-7d79adf4841e.jpg"
      },
      { //웨이트 1달 수업
        id: "fdf564c7-6a11-4268-b8c0-05efb37f6435",
        product_id: "ee7905b0-2424-4524-8336-cdf4faf10598",
        filename: "fdf564c7-6a11-4268-b8c0-05efb37f6435.jpg"
      },
      { //크로스핏 1달 수업
        id: "ba18ea5d-5f58-46af-8a5e-3ea7f5576731",
        product_id: "68a83f1b-c924-4528-a8cc-5f07dde53c37",
        filename: "ba18ea5d-5f58-46af-8a5e-3ea7f5576731.jpg"
      },
      { //극한의 다이어트 1달 수업
        id: "56f9e7ef-abca-4b69-9629-44e0e863d649",
        product_id: "ecdd8580-fa9e-4113-bcfc-9afbb620b878",
        filename: "56f9e7ef-abca-4b69-9629-44e0e863d649.jpg"
      },
      { //초콜릿 레이어 케이크
        id: "897f1e42-dfe9-471c-9dcc-5f656e09449e",
        product_id: "21ae947c-e6e1-46ff-9f7a-de4175e7e76c",
        filename: "897f1e42-dfe9-471c-9dcc-5f656e09449e.jpg"
      },
      { //퐁당 쇼콜라
        id: "e0aa3a7f-120d-4e1c-b176-ae7fd9e7afe8",
        product_id: "6bd0c42b-8532-4a2d-abfc-632245fbf41e",
        filename: "e0aa3a7f-120d-4e1c-b176-ae7fd9e7afe8.jpg"
      },
      { //크로와상 쇼콜라 누아르
        id: "a48eb596-b752-41d0-bdb0-617412a551f0",
        product_id: "710add89-02bc-4eda-94ea-d1fd8aa1d70b",
        filename: "a48eb596-b752-41d0-bdb0-617412a551f0.jpg"
      },
      { //스타벅스
        id: "0035932d-1c1a-40a0-ba9b-88d56155d53b",
        shop_id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
        filename: "0035932d-1c1a-40a0-ba9b-88d56155d53b.jpg"
      },
      { //울프강 스테이크 하우스
        id: "cb5eec18-f272-4f41-8c83-c2e35426a34b",
        shop_id: "12950ae2-767b-4671-81fa-09159349918e",
        filename: "cb5eec18-f272-4f41-8c83-c2e35426a34b.jpg"
      },
      { //터닝포인트짐
        id: "79e9f394-3605-4331-aaec-ba74fcd58f02",
        shop_id: "20d9e08e-b3d1-43e3-a3c9-5ec771c5abb8",
        filename: "79e9f394-3605-4331-aaec-ba74fcd58f02.jpg"
      },
      { //고디바
        id: "0ff074cc-a63f-40f0-a2bb-a0f3a2a7a2db",
        shop_id: "59ac2672-58f9-4f9f-a553-a9ed82140a61",
        filename: "0ff074cc-a63f-40f0-a2bb-a0f3a2a7a2db.jpg"
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
  }
};
