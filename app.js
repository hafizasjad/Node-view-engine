const express = require('express');
// const morgan = require('morgan');

const mongoose = require('mongoose');
const app = express();

const DB = "mongodb+srv://WorkingDatabase:iCodeDatabase@workingdatabase.os7re.mongodb.net/WorkingDatabase?retryWrites=true&w=majority"


mongoose.connect(DB)
app.listen(8000);

app.set('view engine', 'ejs');


app.use(express.static('public'))


app.get('/', (req, res) => {
  const blogs = [
    {title: 'Ali finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Saad finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];

  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});


app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});



