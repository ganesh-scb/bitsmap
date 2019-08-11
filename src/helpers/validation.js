export const isValidEmail = emailStr => {
  return (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailStr))
}

export const isValidPassword = passwordStr => {
  if (passwordStr.length > 6) {
     return false
   } else {
    return (/[a-zA-Z]/.test(passwordStr) && /[0-9]/.test(passwordStr) && /[!@#$]/.test(passwordStr))
  }
}
