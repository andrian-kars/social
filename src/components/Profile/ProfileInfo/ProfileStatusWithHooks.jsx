import { useState } from 'react'
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = props => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            <p onClick={activateEditMode} className={s.status}>
                {!editMode ? <span className={s.staticStatus}>{props.status || '-----'}</span>
                    : <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} className={`${s.changeStatus}`} value={status} />}
            </p>
        </>
    )
}

export default ProfileStatusWithHooks