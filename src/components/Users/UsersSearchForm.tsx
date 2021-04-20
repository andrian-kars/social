import s from './Users.module.scss'
import { Field, Form, Formik } from 'formik'
import { FilterType } from '../../redux/usersReducer'
import React from 'react'

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChange }) => {

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
            initialValues={{ term: '', friend: 'null' }}
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