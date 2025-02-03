const { default: axios } = require('axios');
const express = require('express');
const app = express();
PORT = process.env.PORT || 3000;
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.get('/api/classify-number', async (req, res) => {

    const number = req.query.number;
    
    if (!number || isNaN(number)){
        return res.status(400).json({ number: number, error: true });
    };

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
   }

   const digitSum = (num)=>{
       let sum = 0;
    return  String(num).split('').reduce((acc, curr) => acc + Number(curr), 0); 
   }
    
   const armStrongProperty = [];

    if (isArmStrong(num)) armStrongProperty.push('Armstrong');
    if (num % 2 === 0) armStrongProperty.push('Even');
    else armStrongProperty.push('Odd');

    try{

        const response = await axios.get(`http://numbersapi.com/${num}/math`);
        const funFact = response.data;
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
        return res.status(500).json({ error: 'Failed to fetch fun facts' });
    }
 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});