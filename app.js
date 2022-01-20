const express = require('express');
const Blog = require('./models/blog');


const mongoose = require('mongoose');
const { result } = require('lodash');


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




// app.get('/add-blog' , (req ,res )=>{
//   const blog = new Blog({
//     title : "NEW Blog 2",
//     snippet : "About my new Blog",
//     body : "More About Blog Content"
//   });

//   blog.save()
//     .then((result)=>{
//       res.send(result);
//     })
//     .catch((err)=>{
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req ,res)=>{
//   Blog.find()
//     .then((result)=>{
//       res.send(result);
//     })
//     .catch((err)=>{
//       console.log(err);
//     });
// })


// app.get('/single-blog', (req ,res)=>{
//   Blog.findById('61e820dbfca1461f64245a6c')
//     .then((result)=>{
//       res.send(result);
//     })
//     .catch((err)=>{
//       console.log(err);
//     });
// })



app.post('/blogs' , (req, res)=>{
  const blog = new Blog(req.body);

  blog.save()
    .then((result)=>{
      res.redirect('/blogs');

    })
    .catch((err)=>{
      console.log(err);
    });

});


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});





app.get('/blogs' , (req ,res) =>{
  Blog.find()
  .then((result)=>{
    res.render('index' , {title : "All Blogs" , blogs : result})
  })
  .catch((err)=>{
    console.log(err);
  });
})



app.get('/blog/:id' , (req ,res)=>{
  const id = req.params.id;
  Blog.findById(id)
    .then((result)=>{
      res.render('details' , {blogs : result , title : "Blog Detalts"})

    })
    .catch(err=>{
      console.log(err);
    });

});

app.delete('/blog/:id' , (req ,res)=>{
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(()=>{
      res.json({redirect : '/blogs'})
    })
    .catch(err=>{
      console.log(err);
    });
});






app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});


app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});



