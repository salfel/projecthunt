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

export default function UpdatePassword() {
	const user = useUser();

	return (
		user.hasPassword && (
			<Card>
				<CardHeader>
					<CardTitle>Update Password</CardTitle>
					<CardDescription>
						Enter your current password and a new password to update
						your account's password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<UpdatePasswordForm />
				</CardContent>
			</Card>
		)
	);
}

function UpdatePasswordForm() {
	const { data, setData, errors, put } = useForm({
		current_password: "",
		password: "",
		password_confirmation: "",
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		put(route("password.update"), {
			preserveScroll: true,
			onSuccess: () => {
				setData({
					current_password: "",
					password: "",
					password_confirmation: "",
				});
			},
		});
	}

	return (
		<form className="space-y-5" onSubmit={handleSubmit}>
			<FormField
				id="current_password"
				label="Current Password"
				value={data.current_password}
				setData={setData}
				error={errors.current_password}
			/>

			<FormField
				id="password"
				label="New Password"
				value={data.password}
				setData={setData}
				error={errors.password}
			/>

			<FormField
				id="password_confirmation"
				label="Confirm Password"
				value={data.password_confirmation}
				setData={setData}
				error={errors.password_confirmation}
			/>

			<Button type="submit">Update Password</Button>
		</form>
	);
}
