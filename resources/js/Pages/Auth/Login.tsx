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
                type="password"
                value={data.password}
                setData={setData}
                error={errors.password}
            />

            <Button className="w-full" type="submit">
                Login
            </Button>
        </form>
    );
}

Login.layout = (page: ReactNode) => (
    <AuthLayout title="Login">{page}</AuthLayout>
);

export default Login;
