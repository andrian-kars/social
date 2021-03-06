import s from './ProfileDataForm.module.scss'
import { createField, GetStringKeys, Input, Textarea } from '../../../common/FormsControls/FormsControls'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileType } from '../../../../types/types'
import { memo } from 'react'

type ProfileTypeKeys = GetStringKeys<ProfileType>

type PropsType = {
    profile: ProfileType
    // error: number | null
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = memo(({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit} className={s.form}>
        {error && <span className={s.formError}>{error}</span>}
        <button className={s.editMode}>
            <svg viewBox="0 0 20 20">
                <path d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
            </svg>
        </button>
        <div className={s.name}>
            {createField<ProfileTypeKeys>('Full Name', 'fullName', [], Input)}
        </div>
        <div className={s.job}>
            <div className={s.openToWork}>
                <span className={s.text_asked}>Open to work:</span>
                {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
            </div>
            <div className={s.textarea}>
                {createField<ProfileTypeKeys>('Job description...', 'lookingForAJobDescription', [], Textarea)}
            </div>
        </div>
        <div className={s.socials}>
            {Object.keys(profile.contacts).map(key => {
                if (key === 'mainLink') {
                    return null
                }
                return <div key={key} className={s.social}>
                    {/* TODO: types */}
                    <span>{key}: </span>{createField(key, `contacts.${key}`, [], Input)}
                </div>
            })}
        </div>
    </form>
})

export const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfileDataForm)