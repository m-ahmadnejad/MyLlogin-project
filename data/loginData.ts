export const validUsers = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
]

export const invalidUsers = [
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    error: 'Epic sadface: Sorry, this user has been locked out.',
  },

]