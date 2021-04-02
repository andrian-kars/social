import s from './Burger.module.scss'

const Burger = show => {
    return (
        <button className={!show.show ? s.hamburgerIcon : `${s.hamburgerIcon} ${s.active}`}>
            <span className={`${s.line} ${s.lineOne}`}></span>
            <span className={`${s.line} ${s.lineTwo}`}></span>
            <span className={`${s.line} ${s.lineThree}`}></span>
        </button>
    )
}

export default Burger