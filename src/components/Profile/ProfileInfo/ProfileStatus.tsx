import { ChangeEvent, useEffect, useState } from 'react'
import s from './ProfileInfo.module.scss'

type PropsType = {
    status: string
    updateStatus: (statusHook: string) => void
}

const ProfileStatus: React.FC<PropsType> = ({ status, updateStatus }) => {
    const [editMode, setEditMode] = useState(false)
    const [statusHook, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(statusHook)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            <p onClick={activateEditMode} className={s.status}>
                {!editMode ? <span className={s.staticStatus}>{status || '-----'}</span>
                    : <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} className={`${s.changeStatus}`} value={statusHook} />}
            </p>
        </>
    )
}

export default ProfileStatus