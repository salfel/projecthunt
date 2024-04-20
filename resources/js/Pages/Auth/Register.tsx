import AuthLayout from "@/Layouts/AuthLayout";
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
import { Separator } from "@/components/ui/separator";
import { useForm } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React, { type FormEvent } from "react";

const Register = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>
					Register to start developing like a pro
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-8">
				<RegisterForm />

				<Separator />

				<a href={route("github.redirect")} className="block">
					<Button
						variant="outline"
						size="lg"
						className="w-full space-x-3"
					>
						<GitHubLogoIcon className="size-4" />
						<span>Register with Github</span>
					</Button>
				</a>
			</CardContent>
		</Card>
	);
};

function RegisterForm() {
	const { data, setData, errors, post } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		post("/register");
	}

	return (
		<form className="w-96 space-y-6" onSubmit={handleSubmit}>
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
					type="email"
					value={data.email}
					onChange={(e) =>
						setData({ ...data, email: e.target.value })
					}
					placeholder="example@email.com"
				/>
				{errors.email && (
					<span className="text-red-500 text-sm">{errors.email}</span>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
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
				<Label htmlFor="password_confirmation">Confirm Password</Label>
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
			<Button className="w-full" type="submit">
				Register
			</Button>
		</form>
	);
}

Register.layout = (page) => <AuthLayout title="Register">{page}</AuthLayout>;

export default Register;
