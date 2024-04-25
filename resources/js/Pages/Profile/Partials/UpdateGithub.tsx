import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

export default function UpdateGithub() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Change Github profile</CardTitle>
				<CardDescription>
					Switch to a different account for seamless integration.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<a
					href={route("github.redirect", {
						intended: route("profile.edit"),
					})}
				>
					<Button variant="secondary" className="space-x-3">
						<GitHubLogoIcon className="size-4" />
						<span>Update Github</span>
					</Button>
				</a>
			</CardContent>
		</Card>
	);
}
