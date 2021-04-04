import s from './ProfileInfo.module.scss'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import facebook from './../../../images/socials/facebook.png'
import website from './../../../images/socials/website.png'
import vk from './../../../images/socials/vk.png'
import twitter from './../../../images/socials/twitter.png'
import instagram from './../../../images/socials/instagram.png'
import youtube from './../../../images/socials/youtube.png'
import github from './../../../images/socials/github.png'
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls'
import { reduxForm } from 'redux-form'

const ProfileDataForm = ({ profile, status, updateStatus, handleSubmit }) => {
    return <form onSubmit={handleSubmit} className={s.profileData}>
        <button className={s.editMode}><svg viewBox="0 0 20 20">
                <path d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
        </svg></button>
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
            {createField(profile.fullName, 'fullName', [], Input)}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
        <div className={s.job}>
            {profile.lookingForAJob === null ? '' : <div className={s.text}>
                <span className={s.text_asked}>Open to work:</span>
                {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
            </div>}
            {createField(!profile.lookingForAJobDescription && 'Job description...', 'lookingForAJobDescription', [], Textarea)}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)

export default ProfileDataReduxForm