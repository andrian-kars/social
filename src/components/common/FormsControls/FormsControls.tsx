import { memo } from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators'
import s from './FormsControls.module.scss'

type FormControlPropsType = { meta: WrappedFieldMetaProps }

export const FormControl: React.FC<FormControlPropsType> = memo(({ meta: { touched, error, active }, children }) => {
    // const hasError = touched && error
    const hasError = active && error
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            {children}
            {hasError && <span>{error}</span>}
        </div>
    )
})

export const Textarea: React.FC<WrappedFieldProps> = memo((props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
})

export const Input: React.FC<WrappedFieldProps> = memo((props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
})

export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FieldValidatorType>, 
    component: React.FC<WrappedFieldProps>,
    props = {}, 
    text = '') {
    return (
        <div>
            <Field placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
            /> {text}
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>