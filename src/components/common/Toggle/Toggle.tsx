import { memo } from 'react'
import s from './Toggle.module.scss'


export const Toggle: React.FC<{ toggle: () => void }> = memo(({ toggle }) => {
    return <label title={'live reload'} onChange={toggle} className={s.switch}>
            <input type="checkbox" />
            <span className={s.slider}></span>
        </label>
})