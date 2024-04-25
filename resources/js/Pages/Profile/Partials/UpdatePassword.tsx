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
			<div className="space-y-1">
				<Label htmlFor="current_password">Current Password</Label>
				<Input
					id="current_password"
					type="password"
					value={data.current_password}
					onChange={(e) =>
						setData({ ...data, current_password: e.target.value })
					}
				/>
				{errors.current_password && (
					<span className="text-red-500 text-sm">
						{errors.current_password}
					</span>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="password">New Password</Label>
				<Input
					id="password"
					type="password"
					value={data.password}
					onChange={(e) =>
						setData({ ...data, password: e.target.value })
					}
				/>
				{errors.password && (
					<span className="text-red-500 text-sm">
						{errors.password}
					</span>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="password_confirmation">
					Confirm new Password
				</Label>
				<Input
					id="password_confirmation"
					type="password"
					value={data.password_confirmation}
					onChange={(e) =>
						setData({
							...data,
							password_confirmation: e.target.value,
						})
					}
				/>
				{errors.password_confirmation && (
					<span className="text-red-500 text-sm">
						{errors.password_confirmation}
					</span>
				)}
			</div>

			<Button type="submit">Update Password</Button>
		</form>
	);
}
