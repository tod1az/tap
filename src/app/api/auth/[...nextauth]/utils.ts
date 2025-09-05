import bcrypt from "bcryptjs"

const SALT = 10

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export async function compareHashedPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}
