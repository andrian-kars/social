export const required = value => {
    if (value) return null
    return 'Cannot be empty'
}

export const maxLengthCreator = maxLength => value => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    return null
}