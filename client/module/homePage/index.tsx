import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {SubmitHandler, useForm} from "react-hook-form";
import Posts from "../posts";
import CreatePost from "../createPost/CreatePost";
import {useDispatch, useSelector} from "react-redux";

const HomePage = () => {
    const [socket, setSocket] = useState<any>(null)
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState<any>([])
    const [newPost, setNewPost] = useState(false)

    const userStore = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setSocket(io('http://localhost:5000'));
    }, [])

    useEffect(() => {
        socket?.emit('newUser', user)
        dispatch({type: 'user', users: user})
    }, [socket, user])

    useEffect(() => {
        socket?.on('getPost', (postData: any) => {
            setPosts([...posts, postData])
        })
    }, [socket, posts])

    const onClickNewPost = () => {
        setNewPost(true)
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit: SubmitHandler<any> = (data: any) => {
        setUser(data.userName)
        reset();
    };

    return (
        <div className='container'>
            {userStore ? (
                    <>
                        <div>{user}</div>
                        {posts?.map((post: any, i: number) => (
                            <Posts key={i} post={post}/>
                        ))}
                    </>
                ) :
                (
                    <div className="login">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type='text' placeholder='username' {...register('userName')}/>
                            <button type='submit'>Login</button>
                        </form>
                    </div>
                )}
            {user == 'admin' && !newPost && (
                <button onClick={onClickNewPost}>Create Post</button>
            )}

            {user == 'admin' && newPost && (
                <CreatePost socket={socket} setNewPost={setNewPost}/>
            )}
        </div>
    );
}

export default HomePage;
