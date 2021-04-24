import s from './Users.module.scss'
import { Field, Form, Formik } from 'formik'
import { FilterType } from '../../redux/usersReducer'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUsersFilter } from '../../redux/usersSelectors'

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

type FriendType = 'true' | 'false' | 'null'
type FormType = {
    term: string
    friend: FriendType
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChange }) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        onFilterChange(filter)
        setSubmitting(false)
    }

    return <div className={s.form}>
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: '' + filter.friend as FriendType }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only Followed</option>
                        <option value="false">Only Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>Find</button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm