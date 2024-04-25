import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/lib/hooks";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

export default function UpdateGithub() {
	const user = useUser();

	return (
		<Card>
			<CardHeader>
				{user.github_id ? (
					<>
						<CardTitle>Change Github profile</CardTitle>
						<CardDescription>
							Switch to a different account for seamless
							integration.
						</CardDescription>
					</>
				) : (
					<>
						<CardTitle>Connect Github Account</CardTitle>
						<CardDescription>
							Add your github account for a seamless integration
						</CardDescription>
					</>
				)}
			</CardHeader>
			<CardContent>
				<a
					href={route("github.redirect", {
						intended: route("profile.edit"),
					})}
				>
					<Button variant="secondary" className="space-x-3">
						<GitHubLogoIcon className="size-4" />
						<span>Login with Github</span>
					</Button>
				</a>
			</CardContent>
		</Card>
	);
}
