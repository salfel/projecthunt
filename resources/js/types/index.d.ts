export type User = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	avatar_url: string;
	github_id: number;
	hasPassword: string;
};

export type Project = {
	id: number;
	name: string;
	full_name: string;
	description: string;
	user?: User;
	tags: Tag[];
};

export type Tag = {
	id: number;
	name: string;
};

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User;
	};
};
