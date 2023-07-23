import { useDispatch } from "react-redux";
import { reactionAdded } from './blogSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

const BlogReactionButtons = ({ blog }) => {
  const dispatch = useDispatch()

  // Check if blog or blog.reactions is not available, render a default message.
  if (!blog || !blog.reactions || Object.keys(blog.reactions).length === 0) {
    return <p>No reactions yet.</p>;
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ blogId: blog.id, reaction: name }))
        }
      >
        {emoji} {blog.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}

export default BlogReactionButtons;