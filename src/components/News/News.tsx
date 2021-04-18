import s from './News.module.scss'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'

type PropsType = {

}

const Home: React.FC<PropsType> = (props) => {
    return (
        <div className={s.news}>
            <div className={s.item}>
                <p>TBD</p>
            </div>
            <div className={s.item}>
                <p>TBD</p>
            </div>
            <div className={s.item}>
                <p>TBD</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    // isAuth: state.auth.isAuth,
    // captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {})(Home)