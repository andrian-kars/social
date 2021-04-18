import { ChangeEvent, useState } from 'react'
import s from './ProfileInfo.module.scss'
import userPhoto from './../../../images/user-photo.png'
import ProfileStatus from './ProfileStatus'
import banner from './../../../images/background/banner.jpg'
import facebook from './../../../images/socials/facebook.png'
import website from './../../../images/socials/website.png'
import vk from './../../../images/socials/vk.png'
import twitter from './../../../images/socials/twitter.png'
import instagram from './../../../images/socials/instagram.png'
import youtube from './../../../images/socials/youtube.png'
import github from './../../../images/socials/github.png'
import ProfileDataReduxForm from './ProfileDataForm'
import { ProfileType } from '../../../types/types'

type InfoPropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    id: number
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (prodile: ProfileType) => Promise<any>

}

const ProfileInfo: React.FC<InfoPropsType> = ({profile, status, updateStatus, isOwner, savePhoto, id, saveProfile, }) => {
    const [editMode, setEditMode] = useState(false)

    const onMainPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            savePhoto(e.currentTarget.files[0])
        }
    }

    const onSubmit = (FormData: ProfileType) => {
        FormData.AboutMe = '---'
        // todo: remove then
        saveProfile(FormData).then(() => {
            setEditMode(false)
        })
        
    }

    return (
        <section className={s.user}>
            <div className={s.banner} style={{ backgroundImage: `url('${banner}'` }}>
                <div className={s.photoWhrapper}>
                    <img className={s.photo} src={profile.photos.large === null ? userPhoto : profile.photos.large} alt={'User photo: ' + id} />
                    {isOwner && <label className={s.uploadPhoto}>
                        <svg viewBox="0 0 20 20">
                            <path d="M6.523,7.683c0.96,0,1.738-0.778,1.738-1.738c0-0.96-0.778-1.738-1.738-1.738c-0.96,0-1.738,0.778-1.738,1.738C4.785,6.904,5.563,7.683,6.523,7.683z M5.944,5.365h1.159v1.159H5.944V5.365z M18.113,0.729H1.888c-0.64,0-1.159,0.519-1.159,1.159v16.224c0,0.64,0.519,1.159,1.159,1.159h16.225c0.639,0,1.158-0.52,1.158-1.159V1.889C19.271,1.249,18.752,0.729,18.113,0.729z M18.113,17.532c0,0.321-0.262,0.58-0.58,0.58H2.467c-0.32,0-0.579-0.259-0.579-0.58V2.468c0-0.32,0.259-0.579,0.579-0.579h15.066c0.318,0,0.58,0.259,0.58,0.579V17.532z M15.91,7.85l-4.842,5.385l-3.502-2.488c-0.127-0.127-0.296-0.18-0.463-0.17c-0.167-0.009-0.336,0.043-0.463,0.17l-3.425,4.584c-0.237,0.236-0.237,0.619,0,0.856c0.236,0.236,0.62,0.236,0.856,0l3.152-4.22l3.491,2.481c0.123,0.123,0.284,0.179,0.446,0.174c0.16,0.005,0.32-0.051,0.443-0.174l5.162-5.743c0.238-0.236,0.238-0.619,0-0.856C16.529,7.614,16.146,7.614,15.91,7.85z"></path>
                        </svg>
                        <input type={'file'} onChange={onMainPhotoSelect} /></label>}
                </div>
            </div>
            <div className={s.info}>
                {!editMode && isOwner && <svg className={s.editMode} onClick={() => { setEditMode(true) }} viewBox="0 0 20 20">
                    <path d="M3.936,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021S5.957,11.116,5.957,10S5.052,7.979,3.936,7.979z M3.936,11.011c-0.558,0-1.011-0.452-1.011-1.011s0.453-1.011,1.011-1.011S4.946,9.441,4.946,10S4.494,11.011,3.936,11.011z M16.064,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021s2.021-0.905,2.021-2.021S17.181,7.979,16.064,7.979z M16.064,11.011c-0.559,0-1.011-0.452-1.011-1.011s0.452-1.011,1.011-1.011S17.075,9.441,17.075,10S16.623,11.011,16.064,11.011z M10,7.979c-1.116,0-2.021,0.905-2.021,2.021S8.884,12.021,10,12.021s2.021-0.905,2.021-2.021S11.116,7.979,10,7.979z M10,11.011c-0.558,0-1.011-0.452-1.011-1.011S9.442,8.989,10,8.989S11.011,9.441,11.011,10S10.558,11.011,10,11.011z"></path>
                </svg>}
                {editMode && isOwner && <svg className={`${s.editMode} ${s.editDischarge}`} onClick={() => { setEditMode(false) }} viewBox="0 0 20 20">
                    <path d="M13.864,6.136c-0.22-0.219-0.576-0.219-0.795,0L10,9.206l-3.07-3.07c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.576,0,0.795L9.205,10l-3.07,3.07c-0.219,0.219-0.219,0.574,0,0.794c0.22,0.22,0.576,0.22,0.795,0L10,10.795l3.069,3.069c0.219,0.22,0.575,0.22,0.795,0c0.219-0.22,0.219-0.575,0-0.794L10.794,10l3.07-3.07C14.083,6.711,14.083,6.355,13.864,6.136z M10,0.792c-5.086,0-9.208,4.123-9.208,9.208c0,5.085,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208C19.208,4.915,15.086,0.792,10,0.792z M10,18.058c-4.451,0-8.057-3.607-8.057-8.057c0-4.451,3.606-8.057,8.057-8.057c4.449,0,8.058,3.606,8.058,8.057C18.058,14.45,14.449,18.058,10,18.058z"></path>
                </svg>}
                {editMode
                    ? <ProfileDataReduxForm initialValues={profile}
                        onSubmit={onSubmit}
                        profile={profile} />
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        id={id}
                        status={status}
                        updateStatus={updateStatus} />
                }
            </div>
        </section>
    )
}

type DataPropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    id: number
    updateStatus: (status: string) => void
}

const ProfileData: React.FC<DataPropsType> = ({ profile, status, updateStatus }) => {
    return <div className={s.profileData}>
        <div className={s.socials}>
            {!!profile.contacts.facebook && <a className={s.social} href={`${profile.contacts.facebook}`} target={'_blank'} rel={'noreferrer'}><img src={facebook} alt={'facebook'} /></a>}

            {!!profile.contacts.website && <a className={s.social} href={`${profile.contacts.website}`} target={'_blank'} rel={'noreferrer'}><img src={website} alt={'website'} /></a>}

            {!!profile.contacts.vk && <a className={s.social} href={`${profile.contacts.vk}`} target={'_blank'} rel={'noreferrer'}><img src={vk} alt={'vk'} /></a>}

            {!!profile.contacts.twitter && <a className={s.social} href={`${profile.contacts.twitter}`} target={'_blank'} rel={'noreferrer'}><img src={twitter} alt={'twitter'} /></a>}

            {!!profile.contacts.instagram && <a className={s.social} href={`${profile.contacts.instagram}`} target={'_blank'} rel={'noreferrer'}><img src={instagram} alt={'instagram'} /></a>}

            {!!profile.contacts.youtube && <a className={s.social} href={`${profile.contacts.youtube}`} target={'_blank'} rel={'noreferrer'}><img src={youtube} alt={'youtube'} /></a>}

            {!!profile.contacts.github && <a className={s.social} href={`${profile.contacts.github}`} target={'_blank'} rel={'noreferrer'}><img src={github} alt={'github'} /></a>}
        </div>
        <div className={`${s.mainStatus}`}>
            <h2 className={s.name}>{profile.fullName}</h2>
            <ProfileStatus status={status} updateStatus={updateStatus} />
        </div>
        <div className={s.job}>
            {profile.lookingForAJob === null ? '' : <p className={s.text}>
                <span className={s.text_asked}>Open to work:</span>{profile.lookingForAJob
                    ? <svg fill={'green'} viewBox="0 0 20 20">
                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                    </svg>
                    : <svg fill={'red'} viewBox="0 0 20 20">
                        <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                    </svg>
                }</p>}
            {profile.lookingForAJobDescription === null ? '' : <p className={s.text}> {profile.lookingForAJobDescription}</p>}
        </div>
    </div>
}

export default ProfileInfo