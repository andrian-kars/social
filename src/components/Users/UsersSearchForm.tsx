import s from './Users.module.scss'
import { Field, Form, Formik } from 'formik'
import { FilterType } from '../../redux/usersReducer'
import React from 'react'

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChange }) => {

    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        onFilterChange(values) 
        setSubmitting(false)
    }

    return <div className={s.form}>
        <Formik
            initialValues={{ term: '' }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <button type="submit" disabled={isSubmitting}>Find</button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm