export const setLSToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const getLSToken = () => {
    return localStorage.getItem('token')
}

export const removeLSToken = () => {
    localStorage.removeItem('token')
}