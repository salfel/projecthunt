export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
}

export interface Project {
	id: number;
	name: string;
	full_name: string;
	description: string;
	user?: User;
	tags: Tag[];
}

export interface Tag {
	id: number;
	name: string;
}

type File = {
	name: string;
	path: string;
	type: "dir" | "file";
};

type FileContent = {
	content: string;
	fileType: string;
};

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User;
	};
};
