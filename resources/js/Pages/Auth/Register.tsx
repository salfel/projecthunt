import AuthLayout from "@/Layouts/AuthLayout";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { FormEvent, ReactNode } from "react";

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

			<FormField
				id="password"
				label="Password"
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

			<Button className="w-full" type="submit">
				Register
			</Button>
		</form>
	);
}

Register.layout = (page: ReactNode) => (
	<AuthLayout title="Register">{page}</AuthLayout>
);

export default Register;
