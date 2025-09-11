export type LoginInputs = {
    email:string,
    password:string
}
export type RegisterInputs = {
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
}
export type ResetPasswordInputs = {
    newPassword:string,
    confirmPassword:string,
}