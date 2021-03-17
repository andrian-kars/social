import s from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={s.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Preloader