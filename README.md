# Number Classification API

This is a simple API that classifies a number and returns interesting mathematical properties along with a fun fact.

## Setup Instruction
- [Prequisite] (#prerequisites)
- [API Endpoint](#api-endpoint)
- [Example Request](#example-request)
- [Example Response](#example-response)
- [Steps to Run Locally](#steps-to-run-locally)

## Prerequisites
Node.js (>= 16.x)
npm (Node Package Manager)

## API Endpoint

**GET** `/api/classify-number?number={number}`

## Example Request

```bash
GET /api/classify-number?number=371

```
## Example Response
``` bash
    {
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["Armstrong", "Odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

```
## Steps To Run Locally
   1. Clone the Repos

``` bash
        git clone https://github.com/chibuezemicahe/numbers-api.git
```
2. Navigate to the project directory:
``` bash
cd numbers-api
```
3. Install dependencies:
```bash
npm install
```
4. Start the server
```bash
npm start
```
5. Access the API at:
```bash
http://localhost:3000/api/classify-number?number={number}
```


