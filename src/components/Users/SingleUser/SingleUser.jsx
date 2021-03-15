import s from './SingleUser.module.css'

const SingleUser = (props) => {
    return (
        <div className={s.whrapper}>
            <div>
                <img src="./" alt={'User photo: ' + props.id}/>
                <button>{props.followed ? 'Follow' : 'Unfollow'}</button>
            </div>
            <div key={props.key}>
                <div>
                    <p>{props.fullName}</p>
                    <p>{props.location}</p>
                </div>
                <p>{props.status}</p>
            </div>
        </div>
    )
}

export default SingleUser