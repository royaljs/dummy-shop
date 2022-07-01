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
    "product_table",
    [
      {
        id: "df9a2afe-6ce0-4797-9be3-3654e42a3dea",
        shop_id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
        name: "아메리카노",
        price: 1000,
        description: "아메리카노"
      },
      {
        id: "de46e11a-6548-415f-b9e5-917db2904554",
        shop_id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
        name: "더치 라떼",
        price: 1500,
        description: "더치 라떼"
      },
      {
        id: "ca59bde4-b430-47d4-a31a-0e4ec39d7df8",
        shop_id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
        name: "연유 라떼",
        price: 1500,
        description: "연유 라떼"
      },
      {
        id: "1dc4282e-d27b-4816-a3cd-7373aaa25584",
        shop_id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
        name: "카라멜 마끼아또",
        price: 1500,
        description: "카라멜 마끼아또"
      },
      {
        id: "c22e1f65-1139-4565-a1b4-05c55289e43e",
        shop_id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
        name: "딸기 스무디",
        price: 2000,
        description: "딸기 스무디"
      },
      {
        id: "38136f00-d2f5-4114-a7a6-0a426feafdfc",
        shop_id: "0a68a872-c9f2-4357-9f08-9ce23b819c52",
        name: "마들렌",
        price: 2000,
        description: "마들렌"
      },
      {
        id: "118ed484-d513-4208-9cd4-1ca83875351c",
        shop_id: "12950ae2-767b-4671-81fa-09159349918e",
        name: "포터하우스 스테이크(1000g)",
        price: 253000,
        description: "USDA PRIME 등급, 28일 이상의 DRY-AGING을 거친 최상급의 스테이크. 시그니처 스테이크."
      },
      {
        id: "75bdf1b8-1bb7-4065-8ab9-06e9bfdf3e9e",
        shop_id: "12950ae2-767b-4671-81fa-09159349918e",
        name: "더블유 코스(1인)",
        price: 178000,
        description: "울프강 스테이크 하우스의 드라이에이징 포터하우스 스테이크와 추천 에피타이저와 인기 사이드 메뉴, 디저트까지 구성되어있는 코스 메뉴"
      },
      {
        id: "d57c4fc6-49d2-4e60-8f72-974b4afaf85c",
        shop_id: "12950ae2-767b-4671-81fa-09159349918e",
        name: "클래식 코스(1인)",
        price: 148000,
        description: "울프강 스테이크 하우스의 인기 메뉴와 드라이에이징 시그니처 스테이크로 구성되어있는 코스 메뉴"
      },
      {
        id: "7120d4eb-554c-4625-aea1-e5e9d1826778",
        shop_id: "12950ae2-767b-4671-81fa-09159349918e",
        name: "런치 코스(1인)",
        price: 86000,
        description: "2021년 런치 방문 고객님께 제공해드리는 울프강 스테이크 하우스의 시그니처 런치 코스"
      },
      {
        id: "18a6b714-ed9c-4f95-af90-e58dc9605ace",
        shop_id: "12950ae2-767b-4671-81fa-09159349918e",
        name: "플레이티드 어니언",
        price: 18000,
        description: "감각적으로 플레이팅한 양파"
      },
      {
        id: "ee7905b0-2424-4524-8336-cdf4faf10598",
        shop_id: "20d9e08e-b3d1-43e3-a3c9-5ec771c5abb8",
        name: "웨이트 1달 수업",
        price: 54000,
        description: "회원님의 근육 볼륨을 키워드립니다."
      },
      {
        id: "68a83f1b-c924-4528-a8cc-5f07dde53c37",
        shop_id: "20d9e08e-b3d1-43e3-a3c9-5ec771c5abb8",
        name: "크로스핏 1달 수업",
        price: 54000,
        description: "회원님의 극한의 근지구력을 키워드립니다."
      },
      {
        id: "ecdd8580-fa9e-4113-bcfc-9afbb620b878",
        shop_id: "20d9e08e-b3d1-43e3-a3c9-5ec771c5abb8",
        name: "극한의 다이어트 1달 수업",
        price: 54000,
        description: "회원님의 건강한 체지방 관리를 도와드립니다."
      },
      {
        id: "21ae947c-e6e1-46ff-9f7a-de4175e7e76c",
        shop_id: "59ac2672-58f9-4f9f-a553-a9ed82140a61",
        name: "초콜릿 레이어 케이크",
        price: 40000,
        description: "로드샵 한정 케이크"
      },
      {
        id: "6bd0c42b-8532-4a2d-abfc-632245fbf41e",
        shop_id: "59ac2672-58f9-4f9f-a553-a9ed82140a61",
        name: "퐁당 쇼콜라",
        price: 9000,
        description: "진한 멜팅 초콜릿과 화이트 초콜릿 아이스크림을 함께 즐기실 수 있는 디저트"
      },
      {
        id: "710add89-02bc-4eda-94ea-d1fd8aa1d70b",
        shop_id: "59ac2672-58f9-4f9f-a553-a9ed82140a61",
        name: "크로와상 쇼콜라 누아르",
        price: 5500,
        description: "크로와상 결 사이사이에 멜팅 초콜릿이 첨가되어있는, 오직 고디바에서만 맛 볼 수 있는 초콜릿 크로와상"
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
