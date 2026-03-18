import crypto from "crypto";

const USERNAME = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET = process.env.AUTH_SECRET;

if (!USERNAME || !PASSWORD || !SECRET) {
    if (process.env.NODE_ENV !== "production") {
        console.warn(
            "[auth] ADMIN_USERNAME, ADMIN_PASSWORD or AUTH_SECRET is missing in .env",
        );
    }
}

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

export function createAuthToken(username, maxAgeSeconds = 60 * 60 * 4) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + maxAgeSeconds;
    const payload = `${username}.${issuedAt}.${expiresAt}`;
    const signature = crypto
        .createHmac("sha256", SECRET)
        .update(payload)
        .digest("hex");

    return `${payload}.${signature}`;
}

export function verifyAuthToken(token) {
    if (!token || !SECRET) return null;

    const parts = token.split(".");
    if (parts.length !== 4) return null;

    const [username, issuedAtStr, expiresAtStr, signature] = parts;
    const payload = `${username}.${issuedAtStr}.${expiresAtStr}`;

    const expectedSignature = crypto
        .createHmac("sha256", SECRET)
        .update(payload)
        .digest("hex");

    const isSignatureValid = crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature),
    );

    if (!isSignatureValid) return null;

    const now = Math.floor(Date.now() / 1000);
    const expiresAt = Number(expiresAtStr);

    if (Number.isNaN(expiresAt) || now > expiresAt) {
        return null;
    }

    return { username };
}
