//import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import BlogReactionButtons from "./BlogReactionButtons";
import { Link } from "react-router-dom";


const BlogsExcerpt = ({ blog }) => {
  return (
    <article>
            <h2>{blog.title}</h2>
            <p className="excerpt">{blog.text.substring(0, 75)}...</p>
            <p className="postCredit">
                <Link to={`blogs/${blog.id}`}>View Post</Link>
                {/* <PostAuthor userId={post.userId} /> */}
                <p>{blog.author}</p>
                <TimeAgo timestamp={blog.createAt} />
            </p>
            <BlogReactionButtons blog={blog} />
        </article>
  )
}

export default BlogsExcerpt