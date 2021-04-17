import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = { isAuth: boolean }

export function WithAuthRedirect<WCP> (WhrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        const {isAuth, ...restProps} = props
        
        if (!props.isAuth) return <Redirect to='/login' />

        return <WhrappedComponent {...restProps as WCP} />
    }
    return connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)
}