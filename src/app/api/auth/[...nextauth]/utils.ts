import bcrypt from "bcryptjs"

const SALT = 10

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(SALT)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

export function compareHashedPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}


