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
import type { FormEvent } from "react";

const Login = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Login to use the full potential of this site
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-8">
				<LoginForm />

				<Separator />

				<a href={route("github.redirect")} className="block">
					<Button
						variant="outline"
						size="lg"
						className="w-full space-x-3"
					>
						<GitHubLogoIcon className="size-4" />
						<span>Login with Github</span>
					</Button>
				</a>
			</CardContent>
		</Card>
	);
};

function LoginForm() {
	const { data, setData, errors, post } = useForm({
		email: "",
		password: "",
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		post("/login");
	}

	return (
		<form className="w-96 space-y-6" onSubmit={handleSubmit}>
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
			<Button className="w-full" type="submit">
				Login
			</Button>
		</form>
	);
}

Login.layout = (page) => <AuthLayout title="Login">{page}</AuthLayout>;

export default Login;
