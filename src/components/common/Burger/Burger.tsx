import s from './Burger.module.scss'

type propsType = {
    show: boolean
}
const Burger: React.FC<propsType> = ({show}) => {
    return (
        <button className={!show ? s.hamburgerIcon : `${s.hamburgerIcon} ${s.active}`}>
            <span className={`${s.line} ${s.lineOne}`}></span>
            <span className={`${s.line} ${s.lineTwo}`}></span>
            <span className={`${s.line} ${s.lineThree}`}></span>
        </button>
    )
}

export default Burger