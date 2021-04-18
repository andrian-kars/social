import { useEffect, useState } from 'react'
import s from './ProfileInfo.module.scss'

const ProfileStatusWithHooks = (props: any) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: any) => {
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