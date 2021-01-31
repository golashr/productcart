# Product Cart Server 
This **typescript based node express server** demonstrates functionality of create, read, update and delete operations of products in the store and Also, to calculate the shopping cart total checkout price based on the configured rules setup in the rule engine. 

It has capability of returning the payable amount based on the selected products and taking provided promotion code from its api `checkout`. 
The server is initialised with 3 products as listed below, details of which are fetched from the `src\libs\initialData.ts`.   

Here is the price list to begin with..
| PRODUCT ID | PRODUCT NAME        |    PRICE |
| ---------- | :------------------ | -------: |
| wf         | Workflow            | \$199.99 |
| mbp        | Document Generation |   \$9.99 |
| docgen     | Form                |  \$99.99 |

Some discounts are offered and these are listed below .

| PROMO CODE | DESCRIPTION                                                                       |
| ---------- | :-------------------------------------------------------------------------------- |
| RRD4D32    | 10% discount for orders above $1000 (pre-discount)                                |
| 44F4T11    | 15% discount for orders above $1500 (pre-discount)                                |
| FF9543D1   | Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased |
| YYGWKJD    | Reduces the form price to $89.99 a unit when at least 1 wf is purchased           |

For simplicity sake, only one promotion code can be applied at a time.

## Example scenarios
### **Scenario 1**

**Products:**	2x wf

**Promotion:** 

**Total:**	$399.98
 	 
### **Scenario 2**
**Products:**	6x wf

**Promotion:**	RRD4D32

**Total:**	$1,079.94
 	 
### **Scenario 3**

**Products:**	1x wf, 1x form

**Promotion**:	YYGWKJD

**Total:**	$289.98

## Features
- **Schema Validation**- APIs are hardened with schema validation. Package used - ajv
- It connects with remotely available **MongoDB** available on http://MONGO_HOST:MONGO_PORT/ and creates DB with name MONGO_DB and uses it to create products list, update, read and delete operations. Additionally, it is used to calculate prices 
- **Swagger** OpenAPI 3.0 is integrated with the server. It is used to develop, test, document, schema validation. 
- MongoDB, Swagger are required to be running as prerequisite. 
  - Swagger testing application can be accessed from http://localhost:4100
- The application interacts with remote APIs to fetch products in the store and to calculate checkout price after applying rules. The APIs are available on
  - `http://localhost:${PORT}`/api/v1/products - GET
  - `http://localhost:${PORT}`/api/v1/checkout - POST
- Typescript with tslint/eslint 
- The server also additinal APIs to support CURD operations for products i.e
  - `http://localhost:${PORT}`/ and `http://localhost:${PORT}`/ping for server health check 
  - `http://localhost:${PORT}`/api/v1/products - POST to add new product
  - `http://localhost:${PORT}`/api/v1/products - PUT to update existing product
- The logs are available under **logs** folder under productcart_combined.log and error in productcart_error.log
  
## Getting Started
### Clone the repo and install the project
```
- git clone https://github.com/golashr/productcart.git
- cd productcart/productcart-server
```
## Prerequisite
- Docker Desktop
- In order to run product-cart server, the MongoDB and Swagger docker containers should be running as pre-requisite. The containers details are
  given in docker-compose.yml

**Running steps**

  NOTE: If there are existing docker instances (sudo docker ps -a), stop and remove them
  ```
  sudo docker stop $(sudo docker ps -aq)
  ```
  ```
  sudo docker rm $(sudo docker ps -aq)
  ```
 
  Create docker network by running this command
   ```
   docker network create -d bridge --subnet 172.19.241.0/24 --gateway 172.19.241.1 productcart_net
   ```

  Run the following command to install all the package dependencies.<br />
   ```
   yarn install
   ```
   
  Run the following command to build the app for production to the `dist` folder.<br />
  It transpile the ts and bundles converted js along with corresponding map files under `dist` folder.<br />

  ```
  yarn build
  ```
  Your app is ready to be deployed.

  Run the following command to build docker container of productcart-service and also run other pertinent containers at once i.e. MongoDB, Swagger from the current working directory.

  ``` 
  docker-compose up -d
  ```

## Not addressed
  - Mocha, Chai based Unit testing

