import s from './ProfileInfo.module.scss'
import userPhoto from './../../../images/user-photo.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import banner from './../../../images/background/banner.jpg'
import facebook from './../../../images/socials/facebook.png'
import website from './../../../images/socials/website.png'
import vk from './../../../images/socials/vk.png'
import twitter from './../../../images/socials/twitter.png'
import youtube from './../../../images/socials/youtube.png'
import github from './../../../images/socials/github.png'
import main from './../../../images/socials/main.png'

const ProfileInfo = (props) => {
    return (
        <section className={s.user}>
            <div className={s.banner} style={{ backgroundImage: `url('${banner}'` }}></div>
            <div className={s.info}>
                <img className={s.photo} src={props.profile.photos.large === null ? userPhoto : props.profile.photos.large} alt={'User photo: ' + props.id} />
                <div className={s.socials}>
                    {props.profile.contacts.facebook === null ? ''
                        : <a className={s.social} href={`${props.profile.contacts.facebook}`} target={'_blank'} rel={'noreferrer'}><img src={facebook} alt={'facebook'} /></a>}

                    {props.profile.contacts.website === null ? ''
                        : <a className={s.social} href={`${props.profile.contacts.website}`} target={'_blank'} rel={'noreferrer'}><img src={website} alt={'website'} /></a>}

                    {props.profile.contacts.vk === null ? ''
                        : <a className={s.social} href={`${props.profile.contacts.vk}`} target={'_blank'} rel={'noreferrer'}><img src={vk} alt={'vk'} /></a>}

                    {props.profile.contacts.twitter === null ? ''
                        : <a className={s.social} href={`${props.profile.contacts.twitter}`} target={'_blank'} rel={'noreferrer'}><img src={twitter} alt={'twitter'} /></a>}

                    {props.profile.contacts.youtube === null ? ''
                        : <a className={s.social} href={`${props.profile.contacts.youtube}`} target={'_blank'} rel={'noreferrer'}><img src={youtube} alt={'youtube'} /></a>}

                    {props.profile.contacts.github === null ? ''
                        : <a className={s.social} href={`${props.profile.contacts.github}`} target={'_blank'} rel={'noreferrer'}><img src={github} alt={'github'} /></a>}

                    {props.profile.contacts.mainLink === null ? ''
                        : <a className={s.social} href={`${props.profile.contacts.mainLink}`} target={'_blank'} rel={'noreferrer'}><img src={main} alt={'main'} /></a>}
                </div>
                <div className={s.mainStatus}>
                    <h2 className={s.name}>{props.profile.fullName}</h2>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                </div>
                <div className={s.job}>
                    {props.profile.lookingForAJob === null ? '' : <p className={s.text}>
                        <span className={s.text_asked}>Open to work:</span>{props.profile.lookingForAJob
                            ? <svg fill={'green'} viewBox="0 0 20 20">
                                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                            </svg>
                            : <svg fill={'red'} viewBox="0 0 20 20">
                                <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                            </svg>
                        }</p>}

                    {props.profile.lookingForAJobDescription === null ? '' : <p className={s.text}> {props.profile.lookingForAJobDescription}</p>}
                </div>
            </div>
        </section>
    )
}

export default ProfileInfo