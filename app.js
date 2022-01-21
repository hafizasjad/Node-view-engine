const express = require('express');

const BlogRoutes = require('./routes/blogRoutes')

const mongoose = require('mongoose');



const app = express();

const DB = "mongodb+srv://WorkingDatabase:iCodeDatabase@workingdatabase.os7re.mongodb.net/Database?retryWrites=true&w=majority"

mongoose.connect(DB)
  .then(()=> app.listen(8000))
  .catch((err)=>{
    console.log(err);
})


app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}));


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});



app.use('/blogs' , BlogRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});



