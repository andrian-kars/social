import s from './News.module.scss'
import { memo, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { actions } from '../../redux/newsReducer'

export const News: React.FC = memo(() => {
    const news = useSelector((state: AppStateType) => state.news.news)

    const dispatch = useDispatch()

    const show = (e: MouseEvent<HTMLDivElement>) => { dispatch(actions.show(+e.currentTarget.id)) }

    return (
        <div className={s.news}>
            <div className={s.head}>
                <h3>News Page</h3>
                <p>by <a href='https://andrian-kars.github.io/' target='_blank' rel='noreferrer'>andrian kars</a></p>
            </div>
            {news.map(n => <div key={'' + n.id} className={s.item}>
                <div onClick={(e) => { show(e) }} id={'' + n.id} className={s.content}><p className={s.heading}>{n.heading}</p>
                    {n.hidden
                        ? <svg className={s.svg} viewBox="0 0 20 20">
                            <path d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319
								c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551
								v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031
								c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902
								c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902
								z"></path>
                        </svg>
                        : <svg className={s.svg} viewBox="0 0 20 20">
                            <path d="M13.774,9.355h-7.36c-0.305,0-0.552,0.247-0.552,0.551s0.247,0.551,0.552,0.551h7.36
								c0.304,0,0.551-0.247,0.551-0.551S14.078,9.355,13.774,9.355z M10.094,0.875c-4.988,0-9.031,4.043-9.031,9.031
								s4.043,9.031,9.031,9.031s9.031-4.043,9.031-9.031S15.082,0.875,10.094,0.875z M10.094,17.809c-4.365,0-7.902-3.538-7.902-7.902
								c0-4.365,3.538-7.902,7.902-7.902c4.364,0,7.902,3.538,7.902,7.902C17.996,14.271,14.458,17.809,10.094,17.809z"></path>
                        </svg>}
                </div>
                {n.hidden
                    ? <div className={s.contentHidden}><p>{n.content}</p></div>
                    : <div className={`${s.contentHidden} ${s.show}`}><p>{n.content}</p></div>}
            </div>)}
        </div>
    )
})