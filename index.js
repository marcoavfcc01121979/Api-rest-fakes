const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var DB = {
  games: [
    {
      id: 23,
      title: 'super mario',
      year: 2020,
      price: 60 
    },
    {
      id: 65,
      title: 'super ',
      year: 2021,
      price: 62 
    },
    {
      id: 2,
      title: 'mario',
      year: 2010,
      price: 69 
    },
    
  ]
}

app.get('/games',(req, res) => {
  res.status(200).json(DB.games)
})

app.get('/games/:id', (req,res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400)
  }else{
    const id = parseInt(req.params.id);

    var games = DB.games.find(g => g.id === id)

    if(games !== undefined){
      res.status(200).json(games);
    }else{
      res.sendStatus(400);
    }
  }
})

app.post('/games', (req, res) => {
  const { title, year, price } = req.body;

  DB.games.push({
    id: 2323,
    title,
    year,
    price
  });

  res.sendStatus(200);
})

app.delete('/games/:id', (req,res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400)
  }else{
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex(g => g.id === id);

    if(index == -1){
      res.sendStatus(404);
    }else{
      DB.games.splice(index, 1)
      res.sendStatus(200);
    }
  }
})

app.put('/games/:id', (req,res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400)
  }else{
    const id = parseInt(req.params.id);

    var games = DB.games.find(g => g.id === id)

    if(games !== undefined){
      const { title, year, price } = req.body;

      if(title !== undefined){
        games.title = title;
      }

      if(year !== undefined){
        games.year = year;
      }

      if(price !== undefined){
        games.price = price;
      }
      res.sendStatus(200);
    }else{
      res.sendStatus(400);
    }
  }
})

app.listen(3000, () => {
  console.log('App rodando!')
})