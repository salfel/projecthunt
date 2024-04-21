import BaseLayout from "@/Layouts/BaseLayout";
import FileTree from "@/components/FileTree";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PageProps, Project } from "@/types";
import React from "react";

interface Props extends PageProps {
	project: Project;
}

const Show = ({ project }: Props) => {
	return (
		<Tabs defaultValue="Details">
			<TabsList className="w-full">
				<TabsTrigger className="flex-1" value="Details">
					Details
				</TabsTrigger>
				<TabsTrigger className="flex-1" value="Files">
					Files
				</TabsTrigger>
				<TabsTrigger className="flex-1" value="Installation">
					Installation
				</TabsTrigger>
			</TabsList>
			<TabsContent value="Details">details</TabsContent>
			<TabsContent value="Files">
				<FileTree project={project} />
			</TabsContent>
			<TabsContent value="Installation">Installation</TabsContent>
		</Tabs>
	);
};

Show.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Show;
