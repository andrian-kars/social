export type FieldValidatorType = (value: string) => string | null

export const required: FieldValidatorType = value => {
    if (value) return null
    return 'Cannot be empty'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => value => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    return null
}