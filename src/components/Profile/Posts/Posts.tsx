import React, { memo } from 'react'
import { actions } from '../../../redux/profileReducer'
import s from './Posts.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { AddPostFormValuesType, AddPostFormRedux } from './AddPostForm'
import { Post } from './Post/Post'

export const Posts: React.FC = memo(() => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    // @ts-ignore
    const userId = useSelector((state: AppStateType) => state.profilePage.profile.userId)
    // @ts-ignore
    const photos = useSelector((state: AppStateType) => state.profilePage.profile.photos)
    const authorazedUserId = useSelector((state: AppStateType) => state.auth.userId)

    const dispatch = useDispatch()

    const onAddPost = (newPostBody: string) => dispatch(actions.addPost(newPostBody))

    const isOwner = userId === authorazedUserId
    const postsElements = [...posts].reverse().map(p => <Post avatar={photos.small} key={p.id} likesCount={p.likesCount} message={p.message} />)
    const addNewPost = (FormData: AddPostFormValuesType) => onAddPost(FormData.newPostBody)

    return (
        <section className={s.posts}>
            {isOwner && <div className={s.whrapper}>
                <p className={s.heading}>Create Post</p>
                <AddPostFormRedux onSubmit={addNewPost} avatar={photos.small} />
            </div>}
            {postsElements}
        </section>
    )
})