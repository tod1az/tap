import { describe, expect, it } from "vitest";
import { compareHashedPassword, hashPassword } from "../utils";


describe("Password Hash", () => {

  const password = "contraseña123"

  it("Generates a hashed password", () => {
    const hashedPass = hashPassword(password)
    expect(hashedPass).not.toEqual(password)
  })

  it("Returns true if the password matches the hash", () => {
    const hashedPass = hashPassword(password)
    const inputPassword = "contraseña123"

    const isPasswordCorrect = compareHashedPassword(inputPassword, hashedPass)
    expect(isPasswordCorrect).toBe(true)
  })

  it("Returns false if the password does not matches the hash", () => {
    const hashedPass = hashPassword(password)
    const inputPassword = "randompassword"

    const isPasswordCorrect = compareHashedPassword(inputPassword, hashedPass)
    expect(isPasswordCorrect).toBe(false)
  })
})
