# Product Cart Client 
This react typescript based single checkout page application demonstrates functionality of showing the payable amount based on the selected products and taking provided promotion code on an online portal. 
The portal has 3 products, details of which are fetched from the backend API.   

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

## Getting Started
### Clone the repo and install the project

- git clone https://github.com/golashr/productcart.git
- cd productcart/productcart-client

**Further setup steps**

1. Run following commands
   ### `yarn install`
   ### `yarn start`
   Runs the app in the development mode.<br />
   Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

   ### `yarn build`

  Builds the app for production to the `build` folder.<br />
  It correctly bundles React in production mode and optimizes the build for the best performance.
  Your app is ready to be deployed!

## Features
- React, React-Hooks, React-saga, React-logger, Axios
- The application interacts with remote APIS to fetch products in the store and to calculate checkout price after applying rules. The APIs are available on
 1. `${API_ENDPOINTS.BASE_URL}`/products
 2. `${API_ENDPOINTS.BASE_URL}`/checkout
- Material-UI based components
- Redux for state management
- Typescript with tslint/eslint 

## Not addressed
1. Jest based Unit testing

