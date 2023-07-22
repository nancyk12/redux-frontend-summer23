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

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ blogId: blog.id, reaction: name }))}
            >
                {emoji} {blog.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default BlogReactionButtons;