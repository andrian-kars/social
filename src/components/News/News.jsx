import s from './News.module.scss'
import { connect } from 'react-redux'

const Home = (props) => {
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

const mapStateToProps = (state) => ({
    // isAuth: state.auth.isAuth,
    // captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { })(Home)