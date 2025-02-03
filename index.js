const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('dotenv').config();

const PORT = process.env.PORT;

app.get('/api/classify-number', async (req, res) => {

   

    const number = req.query.number;
    if (!number || isNaN(number) || !Number.isInteger(Number(number)) || number < 0) {
        return res.status(400).json({ number: number, error: true });
    }

    if (!number || isNaN(number) || number < 0) {
        return res.status(400).json({ number: number, error: true });
    }
    
    const num = parseInt(number);
    
    const isPrime  = (num)=>{
        for (let i = 2; i < num; i++)
            if (num % i === 0) return false;
        return num > 1;
    }

   const isPerfect = (num)=>{
        let sum = 0;
        for(let i = 1; i<num; i++){
            if ( num % i === 0){
                sum += i;
            }
        }
        return sum === num;
   }

   const digitSum = (num)=>{  
    return  String(num).split('').reduce((acc, curr) => acc + Number(curr), 0); 
   }
    
   const properties = [];

   const isArmStrong = (num) => {
    const digits = String(num).split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), digits.length), 0);
    return sum === num;
};

    if (isArmStrong(num)) properties.push('armstrong');
    if (num % 2 === 0) properties.push('even');
    else properties.push('odd');

    try{

        const response = await axios.get(`http://numbersapi.com/${num}/math`);
        const funFact = response.data.text;
        console.log({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties: properties,
            digit_sum: digitSum(num),
            fun_fact: funFact
        });

        console.log({
            "number": 371,
            "is_prime": false,
            "is_perfect": false,
            "properties": ["armstrong", "odd"],
            "digit_sum": 11,  // sum of its digits
            "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" //gotten from the numbers API
        });

        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties: properties,
            digit_sum: digitSum(num),
            fun_fact: funFact
        });
    }
    catch(error){
    return res.status(500).json({error: 'Error while fetching data from external API'});
    }
 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});