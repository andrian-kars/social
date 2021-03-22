import React from 'react'
import s from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
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
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <>
                <p onClick={this.activateEditMode} className={s.status}>
                    {!this.state.editMode ? <span className={s.staticStatus}>{this.props.status || '-----' }</span>
                        : <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} className={`${s.changeStatus}`} value={this.state.status} />}
                </p>
            </>
        )
    }
}

export default ProfileStatus