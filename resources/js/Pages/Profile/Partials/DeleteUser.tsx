import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

export default function DeleteUser() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Delete Account</CardTitle>
				<CardDescription>
					Once your account is deleted, all of its resources and data
					will be permanently deleted. This action cannot be undone.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DeleteUserForm />
			</CardContent>
		</Card>
	);
}

function DeleteUserForm() {
	const {
		data,
		setData,
		errors,
		processing,
		delete: destroy,
	} = useForm({
		password: "",
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		destroy(route("profile.destroy"));
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">Delete User</Button>
			</DialogTrigger>
			<DialogContent className="dark:text-white">
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete your account
					</DialogTitle>
					<DialogDescription>
						Enter your password to confirm you would like to delete
						your account.
					</DialogDescription>
				</DialogHeader>

				<form className="mt-3 space-y-8" onSubmit={handleSubmit}>
					<FormField
						id="password"
						label="Password"
						value={data.password}
						setData={setData}
						error={errors.password}
					/>

					<Button
						disabled={processing}
						type="submit"
						variant="destructive"
					>
						Delete Account
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
