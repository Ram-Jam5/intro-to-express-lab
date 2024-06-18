const express = require('express');
const app = express();
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/greetings/:username', (req, res) => {
    res.send(`<h1>Hello there, ${req.params.username}!`);
});

app.get('/roll/:number', (req, res) => {
   const number = req.params.number;
   if (isNaN(number)) {
    res.send('<h1>You must specify a number.</h1>');
   }
   const randomNumber =Math.floor(Math.random() * parseInt(number));
   res.send(`<h1>you rolled a ${randomNumber}.</h1>`);
});
app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;
    if(index >= collectibles.length) {
        res.send('This item is not in stock. Check back soon');
    }
    const collectible = collectibles[index];
    res.send(`<h1>So you want the ${collectible.name}? For ${collectible.price}, it can be yours!`)
})
app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    if (req.query['min-price']) {
        const minPrice = parseInt(req.query['min-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= minPrice)
    }
    if (req.query['max-price']) {
        const maxPrice = parseInt(req.query['max-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (req.query.type) {
        const type = req.query.type.toLowerCase();
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
    res.send(filteredShoes);
})
app.listen(3000, () => {
    console.log('Listening on port 3000')
})