import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';

//posts
import Counter from './components/posts/Counter';
// import BlogApp from './components/blogs/BlogApp';
// import PostsList from './components/blogs/PostsList';
// import AddPostForm from './components/blogs/AddPostForm';
// import SinglePostPage from './components/blogs/SinglePostPage';
// import EditPostForm from './components/blogs/EditPost';
// import PostsExcerpt from './components/blogs/PostsExcerpt';
// import BlogLayout from './components/blogs/BlogLayout';
// import BlogHeader from './components/blogs/BlogHeader';

//new blog
import BlogLayout from './components/newblogs/BlogLayout';
import BlogForm from './components/newblogs/BlogForm';
import EditBlog from './components/newblogs/EditBlog';
import BlogList from './components/newblogs/BlogList';
import SingleBlogPage from './components/newblogs/SingleBlogPage';
import { fetchBlogs } from './components/newblogs/blogSlice';


function App() {

  const blogs = [
    { id: 1, title: 'Blog 1', text: 'Blog 1 text', author: 'Author 1' },
    { id: 2, title: 'Blog 2', text: 'Blog 2 text', author: 'Author 2' },
    // Add more blogs here...
  ];
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/products",
          element: <Products />
        },
        { path: "/cart", 
        element: <Cart /> 
        },

        // NEW BLOGS
        { path: "/new-blogs", 
           element: <BlogLayout />,
           children: [
          { index: "/blog-list", element: <BlogList blogs={blogs}/> },
          
        ] },
        { path: "/blogs/get-one-blog/:id", element: <SingleBlogPage /> }, 
        { path: "/blog-form", element: <BlogForm /> },
        { path: "/edit/:blogId", element: <EditBlog/>},


        


        // Posts
        // { path: "/counter",
        // element: <Counter />
        // },

        // { path: "/blog",
        // element: <BlogApp />,
        // },
        //   { path: "/posts-list",
        //   element: <PostsList />,
        // },
        //    { path: "add", element: <AddPostForm />},
        //    { path: "post/:postId", element: <SinglePostPage />},
        //     // { path: ":postId", element: <SinglePostPage />}, 
        //     { path: "edit/:postId", element: <EditPostForm />},
  
            
        
      
        
     


        // Login/Register
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]

    },
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;