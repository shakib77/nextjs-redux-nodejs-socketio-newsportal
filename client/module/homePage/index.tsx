import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {SubmitHandler, useForm} from "react-hook-form";
import Posts from "../posts";

const HomePage = () => {
    const [socket, setSocket] = useState<any>(null)
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState<any>([])
    const [createPost, setCreatePost] = useState<any>()
    const [userName, setUserName] = useState('');


    useEffect(() => {
        setSocket(io('http://localhost:5000'));
    }, [])

    useEffect(() => {
        socket?.emit('newUser', user)
    }, [socket, user])

    useEffect(() => {
        socket?.on('getPost', (postData: any) => {
            setPosts([...posts, postData])
        })
    }, [socket, posts])

    useEffect(() => {
        socket?.emit('setPost', (createPost))
    }, [createPost, socket])

    const {register, handleSubmit,reset, formState: {errors}} = useForm();

    const onSubmit: SubmitHandler<any> = (data: any) => {
        setCreatePost(data.post)
        reset();
    };

    return (
        <div className='container'>
            {user ? (
                    <>
                        {userName}
                        {posts?.map((post: any, i: number) => (
                            <Posts key={i} post={post}/>
                        ))}
                    </>
                ) :
                (
                    <div className="login">
                        <input onChange={(event) => setUserName(event.target.value)} placeholder='username'/>
                        <button onClick={() => setUser(userName)}>Login</button>
                    </div>
                )}

            {user == 'admin' && (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type='text' placeholder='Write...' {...register("post")}/>
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default HomePage;
