import { useState } from 'react'
import s from './ProfileInfo.module.scss'
import userPhoto from './../../../images/user-photo.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import banner from './../../../images/background/banner.jpg'
import facebook from './../../../images/socials/facebook.png'
import website from './../../../images/socials/website.png'
import vk from './../../../images/socials/vk.png'
import twitter from './../../../images/socials/twitter.png'
import instagram from './../../../images/socials/instagram.png'
import youtube from './../../../images/socials/youtube.png'
import github from './../../../images/socials/github.png'
import ProfileDataForm from './ProfileDataForm'

// const objCont = {
//     "facebook": facebook,
//     "website": website,
//     "vk": vk,
//     "twitter": twitter,
//     "instagram": instagram,
//     "youtube": youtube,
//     "github": github,
// }
/* {Object.keys(props.profile.contacts).map(key => {
                        console.log(key);
                        console.log(objCont[key]);
                        if (key.value) {
                            console.log('');
                        }
                        debugger
                        return Contact(key, objCont[key])
                    })} */

const ProfileInfo = (props) => {
    
    const [editMode, setEditMode] = useState(false)

    const onMainPhotoSelect =  e => {
        if (e.currentTarget.files.length) {
            props.savePhoto(e.currentTarget.files[0])
        }
    }

    return (
        <section className={s.user}>
            <div className={s.banner} style={{ backgroundImage: `url('${banner}'` }}>
                <div className={s.photoWhrapper}>
                    <img className={s.photo} src={props.profile.photos.large === null ? userPhoto : props.profile.photos.large} alt={'User photo: ' + props.id} />
                    {props.isOwner && <label className={s.uploadPhoto}>
                        <svg viewBox="0 0 20 20">
                            <path d="M6.523,7.683c0.96,0,1.738-0.778,1.738-1.738c0-0.96-0.778-1.738-1.738-1.738c-0.96,0-1.738,0.778-1.738,1.738C4.785,6.904,5.563,7.683,6.523,7.683z M5.944,5.365h1.159v1.159H5.944V5.365z M18.113,0.729H1.888c-0.64,0-1.159,0.519-1.159,1.159v16.224c0,0.64,0.519,1.159,1.159,1.159h16.225c0.639,0,1.158-0.52,1.158-1.159V1.889C19.271,1.249,18.752,0.729,18.113,0.729z M18.113,17.532c0,0.321-0.262,0.58-0.58,0.58H2.467c-0.32,0-0.579-0.259-0.579-0.58V2.468c0-0.32,0.259-0.579,0.579-0.579h15.066c0.318,0,0.58,0.259,0.58,0.579V17.532z M15.91,7.85l-4.842,5.385l-3.502-2.488c-0.127-0.127-0.296-0.18-0.463-0.17c-0.167-0.009-0.336,0.043-0.463,0.17l-3.425,4.584c-0.237,0.236-0.237,0.619,0,0.856c0.236,0.236,0.62,0.236,0.856,0l3.152-4.22l3.491,2.481c0.123,0.123,0.284,0.179,0.446,0.174c0.16,0.005,0.32-0.051,0.443-0.174l5.162-5.743c0.238-0.236,0.238-0.619,0-0.856C16.529,7.614,16.146,7.614,15.91,7.85z"></path>
                        </svg>
                        <input type={'file'} onChange={onMainPhotoSelect} /></label>}
                </div>
            </div>
            <div className={s.info}>
                {props.isOwner && <button className={s.editMode} onClick={() => {setEditMode(true)}}>
                    <svg viewBox="0 0 20 20">
                        <path d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619"></path>
                    </svg>
                </button>}
                {editMode
                    ? <ProfileDataForm profile={props.profile} />
                    : <ProfileData profile={props.profile}
                        isOwner={props.isOwner}
                        id={props.id}
                        onMainPhotoSelect={onMainPhotoSelect}
                        status={props.status}
                        updateStatus={props.updateStatus} />
                }
            </div>
        </section>
    )
}

const ProfileData = ({ profile, status, updateStatus }) => {
    return <div className={s.profileData}>
        <div className={s.socials}>
            {profile.contacts.facebook === null ? ''
                : <a className={s.social} href={`${profile.contacts.facebook}`} target={'_blank'} rel={'noreferrer'}><img src={facebook} alt={'facebook'} /></a>}

            {profile.contacts.website === null ? ''
                : <a className={s.social} href={`${profile.contacts.website}`} target={'_blank'} rel={'noreferrer'}><img src={website} alt={'website'} /></a>}

            {profile.contacts.vk === null ? ''
                : <a className={s.social} href={`${profile.contacts.vk}`} target={'_blank'} rel={'noreferrer'}><img src={vk} alt={'vk'} /></a>}

            {profile.contacts.twitter === null ? ''
                : <a className={s.social} href={`${profile.contacts.twitter}`} target={'_blank'} rel={'noreferrer'}><img src={twitter} alt={'twitter'} /></a>}

            {profile.contacts.instagram === null ? ''
                : <a className={s.social} href={`${profile.contacts.instagram}`} target={'_blank'} rel={'noreferrer'}><img src={instagram} alt={'instagram'} /></a>}

            {profile.contacts.youtube === null ? ''
                : <a className={s.social} href={`${profile.contacts.youtube}`} target={'_blank'} rel={'noreferrer'}><img src={youtube} alt={'youtube'} /></a>}

            {profile.contacts.github === null ? ''
                : <a className={s.social} href={`${profile.contacts.github}`} target={'_blank'} rel={'noreferrer'}><img src={github} alt={'github'} /></a>}
        </div>
        <div className={`${s.mainStatus}`}>
            <h2 className={s.name}>{profile.fullName}</h2>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
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

// const Contact = ({ contactValue, contactImg }) => {
//     return contactValue === null ? ''
//         : <a className={s.social} href={`${contactValue}`} target={'_blank'} rel={'noreferrer'}><img src={contactImg} alt={'contact'} /></a>
// }

export default ProfileInfo