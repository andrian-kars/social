import s from './Preloader.module.scss'

const Preloader = () => {
    return (
        <div className={s.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Preloader