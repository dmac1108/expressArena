const express = require('express');
const morgan = require('morgan');
const alphabet = require('./alphabet');

const app = express();
app.use(morgan('dev'));

app.get('/',(req,res) => {
    res.send('Hello Express!');
});

app.get('/burgers', (req,res) => {
    res.send('We have juicy cheese burgers!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request: 
    Body: ${req.body}
    Host: ${req.hostname}
    Path: ${req.path}
    IP: ${req.ip}`;
    res.send(responseText);

});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }
    if(!race){
        return res.status(400).send('Please provide a race');
    }
    const greeting = `Greetings ${name} the ${race}! Welcome to our kingdom`;
    res.send(greeting);
    
});

app.get('/sum', (req, res)=>{
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    
    if(isNaN(a+b)){
        res.status(400).send('Values are not a number. Please enter a valid number for a and b');
    }
    const sum = a + b;
    res.send(`The sum of a and b is ${sum}`);
});

app.get('/cipher', (req, res)=>{
    const text = req.query.text;
    const shift = Number(req.query.shift);
    
        let encrypted ='';
       if(!text){
           res.status(400).send('Please enter text to be encrypted');
       }

       if(!shift ){
        res.status(400).send('Please enter the shift for the cipher');}

        if(!Number.isInteger(shift)){
            res.status(400).send('Please enter an integer for shift');
        }
  
        for (let i=0; i<text.length; i++){
            for (let j=0; j<alphabet.alphabetArray.length; j++){
                
                if(text.charAt(i) === alphabet.alphabetArray[j]){
                    if(j+shift<25){
                    encrypted += alphabet.alphabetArray[j+shift];
                    }
                    else{
                        let offset = (j+shift)-26;
                        encrypted += alphabet.alphabetArray[offset];
                    }
                }
            } 
        }

    res.send(encrypted);
    
});

app.get('/lotto', (req,res)=>{
    const numbers = req.query.numbers;
   

    if(numbers.length<6){
        res.status(400).send('Please enter 6 numbers');
    }

    let winningNumbers = [];
    for (let i=0; i<6; i++){
        winningNumbers[i] = Math.floor(Math.random()*20);
    }
    
    let matches = 0;
    for (let i=0; i<6; i++){
        for (let j=0; j<6; j++){
            if(winningNumbers[i]=== Number(numbers[j])){
                matches +=1;
            }

        }
    }
    if(matches < 4){
        res.send(`Sorry, you lose. You matched ${matches}. Your numbers were ${numbers.join(' ')}. The winning numbers were ${winningNumbers.join(' ')}`);
    }
    else if(matches ===4){
        res.send('Congratulations, you win a free ticket');
    }
    else if(matches ===5){
        res.send('Congratulations, you win $100!');

    }
    else{
        res.send('Wow! Unbelievable! You could have won the megamillions');
    }

    res.send(winningNumbers.join('/'));
});


app.listen(8000, () => {
    console.log('Express server is listening on port 8000');
});

