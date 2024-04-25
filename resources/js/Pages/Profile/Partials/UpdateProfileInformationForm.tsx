import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/lib/hooks";
import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

export function UpdateProfileInformationForm() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
				<CardDescription>
					Update your account's profile information and email address.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ProfileInformationForm />
			</CardContent>
		</Card>
	);
}

function ProfileInformationForm() {
	const user = useUser();

	const { data, setData, errors, put } = useForm({
		name: user.name,
		email: user.email,
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		put(route("profile.update"));
	}

	return (
		<form className="space-y-5" onSubmit={handleSubmit}>
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				{errors.name && (
					<span className="text-red-500 text-sm">{errors.name}</span>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					value={data.email}
					onChange={(e) =>
						setData({ ...data, email: e.target.value })
					}
					disabled={user.github_id !== null}
				/>
				{errors.email && (
					<span className="text-red-500 text-sm">{errors.email}</span>
				)}
			</div>

			<Button type="submit">Update Profile</Button>
		</form>
	);
}
