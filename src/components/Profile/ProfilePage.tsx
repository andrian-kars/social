import { memo, useEffect } from 'react'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'
import { useParams } from 'react-router-dom'

export const ProfilePage = memo(() => {
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const authorazedUserId = useSelector((state: AppStateType) => state.auth.userId)
    
    const dispatch = useDispatch()
    const params: { userId: string | undefined } = useParams()

    const onUpdateStatus = (status: string) => { dispatch(updateStatus(status)) }
    const onSavePhoto = (file: File) => { dispatch(savePhoto(file)) }
    // TODO Promise fix
    const onSaveProfile = (profile: ProfileType):any => { dispatch(saveProfile(profile)) }

    const requestedUserId: number = params.userId === undefined ? 0 : +params.userId
    

    useEffect(() => {
        const onGetProfile = (userId: number) => { dispatch(getProfile(userId)) }
        const onGetStatus = (userId: number) => { dispatch(getStatus(userId)) }
        
        const userId: number = requestedUserId ? requestedUserId : authorazedUserId
        onGetProfile(userId)
        onGetStatus(userId)
        
    }, [dispatch, authorazedUserId, requestedUserId])

    return (
        <Profile
            isOwner={+requestedUserId === authorazedUserId || requestedUserId === undefined}
            profile={profile}
            status={status}
            updateStatus={onUpdateStatus}
            savePhoto={onSavePhoto}
            onSaveProfile={onSaveProfile} />
    )
})