# Dummy Shop
테스트용 매장 서버

# 실행 방법
## 1. 환경 설정
* MySQL DB 서버를 실행한다. (편의성을 위해 Docker 이미지 사용 권장)

```
$ cp .env.default .env 
`.env`에 서버 환경에 맞는 정보를 추가한다.
```

## 2. 실행
```
$ yarn              # 필요한 Node.js 패키지를 설치한다.
$ yarn start:dev (최초실행)   # Dummy Shop 서버 실행. 이때 MySQL 테이블이 생성된다.
$ npx sequelize db:seed:all # 미리 준비된 Shop, Product 전용 dummy data를 MySQL 테이블에 추가한다.
$ yarn start:dev    # Dummy Shop 서버 실행. 이때부터 dummy Shop, Product를 이용가능하다.
```
# DB 객체 속성

## Shop
| attribute (Type)           | Description                          |
| ---------------                         | ------------------------------------------------ |
| **id** (string) _required_   | Shop의 고유번호     |
| **name** (string) _required_      | Shop의 이름                         |
| **is_pay_later_allowed** (boolean)     | 후불 주문 허용 여부. 기본값은 false(선불 결제만 지원)                          |
| **address** (string)     | 주소                        |
| **contact_number** (string)    | 대표 전화번호                         |
| **contact_email** (string)     | 대표 이메일 항목                         |
| **description** (string)    | Shop에 대한 설명                        |

## Product
| attribute (Type)           | Description                          |
| ---------------                         | ------------------------------------------------ |
| **id** (string) _required_   | Product의 고유번호     |
| **shop_id** (string) _required_   | Product가 포함된 Shop의 고유번호     |
| **name** (string) _required_      | Product의 이름                         |
| **price** (integer)  _required_    | Product의 가격                        |
| **description** (string)    | Product에 대한 설명                        |

## Image
| attribute (Type)           | Description                          |
| ---------------                         | ------------------------------------------------ |
| **id** (string) _required_   | Image의 고유번호     |
| **shop_id** (string)   | 해당 Image가 포함된 Shop의 고유번호     |
| **prodct_id** (string)      | 해당 Image가 포함된 Product의 고유번호                       |
| **filename** (integer)  _required_    | 이미지 서버 파일 시스템에 저장될 파일명 (확장자 포함)                        |


# API 명세

# Shop API

## GET /shop
* 등록된 모든 Shop의 목록을 조회한다.
* request body 없음
* response는 Shop 객체의 배열

## GET /shop/:id
* 특정 Shop을 조회한다.
* request body 없음
* response는 Shop 객체

## GET /shop/:id/product
* 특정 Shop에 포함된 상품 목록을 조회한다.
* request body 없음
* response는 Product 객체의 배열

## POST /shop
* Shop을 생성한다.
* request body: name(필수), is_pay_later_allowed, address, contact_number, contact_email, description
* response는 Shop 객체

## POST /shop/:id/update
* Shop을 수정한다. (PUT 방식의 수정)
* request body: name(필수), is_pay_later_allowed, address, contact_number, contact_email, description
* response는 Shop 객체

## POST /shop/:id/delete
* 특정 Shop을 삭제한다.
* request body 없음
* response는 삭제 메시지

## POST /shop/:id/orders/:order_id/approve
* Shop에 들어온 주문을 승인한다. Order DB에 주문 상태를 반영하며, user_id에 해당하는 모바일 기기에 알림을 보낸다. 해당 API는 Dummy Shop Dashboard에서 호출하는 API이다.
* request body: order_id(주문 고유번호), pay_later(후불이면 true, 선불이면 false)
* response는 현재 status(approved), approval_id, desc(주문 승인/거절에 대한 설명)으로 구성된다.

## POST /shop/:id/orders/:order_id/decline
* Shop에 들어온 주문을 거절한다. Order DB에 주문 상태를 반영하며, user_id에 해당하는 모바일 기기에 알림을 보낸다. 해당 API는 Dummy Shop Dashboard에서 호출하는 API이다.
* request body: order_id(주문 고유번호), pay_later(후불이면 true, 선불이면 false)
* response는 현재 status(declined), decline_id, desc(주문 승인/거절에 대한 설명)으로 구성된다.

# Product API

## GET /product
* 등록된 모든 Product의 목록을 조회한다.
* request body 없음
* response는 Product 객체의 배열

## GET /product/:id
* 특정 Product을 조회한다.
* request body 없음
* response는 Product 객체

## POST /product
* Product을 생성한다.
* request body: name(필수), shop_id(필수), price(필수), description
* response는 Product 객체

## POST /product/:id/update
* Product을 수정한다. (PUT 방식의 수정)
* request body: name(필수), price(필수), description
* shop_id는 변경 불가!
* response는 Product 객체

## POST /product/:id/delete
* 특정 Product을 삭제한다.
* request body 없음
* response는 삭제 메시지

# Image API

이미지 API를 통해 관리되는 이미지 파일은 ./images 디렉토리에 저장된다.

## GET /images/:id
* 특정 Image 파일을 다운로드한다.
* request body 없음
* response는 Image 파일

## GET /images/product/:id
* 특정 Product에 대한 이미지 id 목록을 조회한다.
* request body 없음
* response는 product_id 및 image_id의 배열 객체

## GET /images/shop/:id
* 특정 Shop에 대한 이미지 id 목록을 조회한다.
* request body 없음
* response는 shop_id 및 image_id의 배열 객체

## POST /images/product/:id
* 특정 Product에 대한 이미지를 업로드 한다.
* request body: form-data 형식. key는 "image"이며, 한번에 10개의 이미지까지 업로드 가능하다.
* response는 product_id 및 image_id의 배열 객체

## POST /images/shop/:id
* 특정 Shop에 대한 이미지를 업로드 한다.
* request body: form-data 형식. key는 "image"이며, 한번에 10개의 이미지까지 업로드 가능하다.
* response는 shop_id 및 image_id의 배열 객체

## POST /images/:id/delete
* 특정 이미지를 서버에서 삭제한다. 해당 이미지는 DB와 파일시스템에서 완전히 삭제된다.
* request body: 없음
* response는 이미지 삭제 성공 메시지

## 이미지 수정 API는 제공하지 않는다. 수정이 필요한 경우, 기존 이미지를 삭제한 후 새로운 이미지를 업로드 한다.

# webhook
소비자의 주문 서비스로 부터의 이벤트 수신을 위한 API이다.
Stripe나 Facebook등에서 제공하는 것과 같은 상용 webhook provider는 소비자의 주문 서비스에 Dummy Shop 서버의 webhook 엔드포인트를 등록하는 기능을 제공하지만, webhook provider 구현은 생각보다 까다로우므로 Dummy Shop 서버에 /webhook 엔드포인트에 handler를 작성하고 소비자의 주문 서비스에서 /webhook 경로로 POST 요청을 보내는 방식으로 구현했다.
현재 webhook으로 구현한 이 기능은 향후 소비자의 주문 서비스와 Shop Order Service간 Kafka Message를 통해 변경되어야 한다.

## POST /webhook
* 현재는 소비자 주문서비스로 부터 주문 승인 요청을 받는 기능만 구현되어있다.
* request body: type(approval_request), shop_id, user_id, order_id, total_amount, price_amount, tax_amount, discount_amount, items(array), description
* response는 주문 요청 성공/대기 메시지
