import crypto from "crypto";

const USERNAME = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;

export function validateCredentials(username, password) {
    if (!USERNAME || !PASSWORD) return false;

    const hash = (value) => crypto.createHash("sha256").update(value).digest();

    const isUserValid = crypto.timingSafeEqual(hash(username), hash(USERNAME));
    const isPasswordValid = crypto.timingSafeEqual(
        hash(password),
        hash(PASSWORD),
    );

    return isUserValid && isPasswordValid;
}
