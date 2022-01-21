const Blog = require('../models/blog');


const blog_index = (req ,res) =>{
    Blog.find()
    .then((result)=>{
      res.render('index' , {title : "All Blogs" , blogs : result})
    })
    .catch((err)=>{
      console.log(err);
    });
  }


const blog_create_post = (req, res)=>{
    const blog = new Blog(req.body);
  
    blog.save()
      .then((result)=>{
        res.redirect('/blogs');
  
      })
      .catch((err)=>{
        console.log(err);
      });
  
}



const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
};


const blog_details = (req ,res)=>{
    const id = req.params.id;
    Blog.findById(id)
      .then((result)=>{
        res.render('details' , {blogs : result , title : "Blog Detalts"})
  
      })
      .catch(err=>{
        res.status(404).render('404', { title: '404' });
      });
  
}

const blog_delete = (req ,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(()=>{
        res.json({redirect : '/blogs'})
      })
      .catch(err=>{
        console.log(err);
      });
}

module.exports = {
    blog_index,
    blog_create_post,
    blog_create_get,
    blog_details,
    blog_delete
}


