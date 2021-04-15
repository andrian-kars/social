import { Field } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators'
import s from './FormsControls.module.scss'

export const FormControl = ({ input, meta: { touched, error, active }, children }) => {
    // const hasError = touched && error
    const hasError = active && error
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            {children}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = props => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = props => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder: string, 
    name: string, 
    validators: Array<FieldValidatorType>, 
    component: string | React.Component | React.FC, 
    props = {}, 
    text = '') => (
    <div>
        <Field placeholder={placeholder} name={name} 
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
)