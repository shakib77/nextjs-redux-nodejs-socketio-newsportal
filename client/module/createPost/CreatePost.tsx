import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";


const CreatePost = ({socket, setNewPost}: any) => {

    const [createPost, setCreatePost] = useState<any>()

    useEffect(() => {
        socket?.emit('setPost', (createPost))
    }, [createPost])

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit: SubmitHandler<any> = (data: any) => {
        setCreatePost(data.post)
        reset();
        setNewPost(false)
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder='Write...' {...register("post")}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default CreatePost;
