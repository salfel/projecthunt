import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
			<FormField
				id="name"
				label="Name"
				value={data.name}
				setData={setData}
				error={errors.name}
			/>

			<FormField
				id="email"
				label="Email"
				value={data.email}
				setData={setData}
				error={errors.email}
			/>

			<Button type="submit">Update Profile</Button>
		</form>
	);
}
