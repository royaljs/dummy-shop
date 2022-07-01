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

## POST /shop/:id/approve
* Shop에 주문 승인을 요청한다.
* request body: order_id(주문 고유번호), pay_later(후불이면 true, 선불이면 false)
* response는 현재 status(approve/decline), approve_id/decline_id, desc(주문 승인/거절에 대한 설명)으로 구성된다.

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
