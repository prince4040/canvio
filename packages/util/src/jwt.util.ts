import {
	type JWTPayload,
	type JWTVerifyResult,
	jwtVerify,
	SignJWT,
} from "jose";

type Options = {
	secret: string;
	expirationTime?: string;
	issuer?: string;
};

export class JwtUtil<Payload extends JWTPayload> {
	private secret?: string;
	private expirationTime: string;
	private issuer: string;

	constructor(options?: Options) {
		this.secret = options?.secret;
		this.expirationTime = options?.expirationTime ?? "2d";
		this.issuer = options?.issuer ?? "";
	}

	verify(token: string, secret?: string): Promise<JWTVerifyResult<Payload>> {
		const jwtSecret = secret ?? this.secret;

		if (!jwtSecret) {
			throw new Error(`jwt secret not provided`);
		}

		const encodedSecret = new TextEncoder().encode(jwtSecret);
		return jwtVerify(token, encodedSecret);
	}

	generate(payload: Payload, secret?: string) {
		const jwtSecret = secret ?? this.secret;
		if (!jwtSecret) {
			throw new Error(`jwt secret not provided`);
		}
		const encodedSecret = new TextEncoder().encode(jwtSecret);

		const token = new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(this.expirationTime)
			.setIssuer(this.issuer)
			.sign(encodedSecret);

		return token;
	}
}
