import { Outlet } from 'react-router-dom';
import PostHeader from './PostHeader';

const PostLayout = () => {
    return (
        <>
            <PostHeader />
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

//export default PostLayout