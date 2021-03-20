import React from 'react'
import s from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }


    render() {
        return (
            <>
                <p onClick={this.activateEditMode} className={s.status}>
                    {!this.state.editMode ? <span className={s.staticStatus}>{this.props.aboutMe}</span>
                        : <input autoFocus={true} onBlur={this.deactivateEditMode} className={`${s.changeStatus}`} value={this.props.aboutMe} />}
                </p>
            </>
        )
    }
}

export default ProfileStatus