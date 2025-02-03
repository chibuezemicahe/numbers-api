const  express = require ("express");
const dotenv = require("dotenv");
const  axios = require ("axios");
const  cors = require ("cors");

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Function to check if number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if number is perfect
const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return sum === num && num !== 1;
};

// Function to check if a number is Armstrong
const isArmstrong = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
};

// Function to get a fun fact from Number API
const getFunFact = async (num) => {
    try {
        const res = await axios.get(`http://numbersapi.com/${num}/math?json`);
        return res.data.text;
    } catch (error) {
        return "No fun fact available";
    }
};

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Number Classifier API! Use /api/classify-number?number=yourNumber to view results, Example: https://number-classifier-api-wahy.onrender.com/api/classify-number?number=4 ");
});


// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;

    // Validate input
    if (!number || isNaN(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number);

    const prime = isPrime(num);
    const perfect = isPerfect(num);
    const armstrong = isArmstrong(num);
    const odd = num % 2 !== 0;
    const digitSum = [...num.toString()].reduce((sum, digit) => sum + Number(digit), 0);

    const properties = [];
    if (armstrong) properties.push("armstrong");
    if (odd) {
        properties.push("odd");
    } else {
        properties.push("even");
    }

    const funFact = await getFunFact(num);
    res.json({
        number: num,
        is_prime: prime,
        is_perfect: perfect,
        properties,
        digit_sum: digitSum,
        fun_fact: funFact,
    });
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${BASE_URL}`);
});