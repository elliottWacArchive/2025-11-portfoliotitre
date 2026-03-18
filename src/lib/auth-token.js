import { SignJWT, jwtVerify } from "jose";

const SECRET = process.env.AUTH_SECRET;

function getKey() {
    if (!SECRET) return null;
    return new TextEncoder().encode(SECRET);
}

export async function signAuthToken(
    { username },
    maxAgeSeconds = 60 * 60 * 24,
) {
    const key = getKey();
    if (!key) throw new Error("AUTH_SECRET is missing");

    return new SignJWT({ username })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(`${maxAgeSeconds}s`)
        .sign(key);
}

export async function verifyAuthToken(token) {
    const key = getKey();
    if (!token || !key) return null;

    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ["HS256"],
        });
        if (typeof payload?.username !== "string") return null;
        return { username: payload.username };
    } catch {
        return null;
    }
}
