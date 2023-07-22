import { Outlet } from 'react-router-dom';


const BlogLayout = () => {
    return (
        <>
          
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default BlogLayout