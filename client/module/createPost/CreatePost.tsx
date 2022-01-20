import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import styles from './CreatePost.module.css'


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
        <div className={styles.container}>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea  placeholder='Write post here...' {...register("post")}/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;
