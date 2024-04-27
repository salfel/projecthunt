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
	demo: string | null;
	full_name: string;
	description: string;
	user?: User;
	tags: Tag[];
};

export type Tag = {
	id: number;
	name: string;
};

export type Pagination<T> = {
	current_page: number;
	data: T[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	next_page_url: string;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
};

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User;
	};
};
