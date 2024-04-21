import FilePreview from "@/components/FilePreview";
import { Button } from "@/components/ui/button";
import { sortFiles } from "@/lib/utils";
import type { File, FileContent, Project } from "@/types";
import { FileIcon, FolderIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
	project: Project;
};

export default function FileTree({ project }: Props) {
	const [path, setPath] = useState("");
	const [files, setFiles] = useState<File[]>([]);
	const [content, setContent] = useState<FileContent>(null);

	const getFiles = useCallback(
		async (path = "") => {
			const response = await fetch(
				route("files.index", [project.id, path]),
			);

			if (!response.ok) return;

			let files: File[] = await response.json();
			files = sortFiles(files);

			setFiles(files);
			setPath(path);
		},
		[project.id],
	);

	const openFile = useCallback(
		async (path: string) => {
			const response = await fetch(
				route("files.show", [project.id, path]),
			);

			if (!response.ok) return;

			setContent({
				content: await response.text(),
				fileType: path.split(".").pop(),
			});
		},
		[project.id],
	);

	useEffect(() => {
		getFiles();
		openFile("README.md");
	}, [getFiles, openFile]);

	const parentPath = useMemo(() => {
		const segments = path.split("/");
		segments.pop();

		return segments.join("/");
	}, [path]);

	return (
		<div className="flex gap-12">
			<div className="grid gap-[0.5px] w-60 h-fit">
				{path !== "" && (
					<ProjectItem
						file={{
							name: "..",
							path: parentPath,
							type: "dir",
						}}
						changeDir={getFiles}
						openFile={openFile}
					/>
				)}
				{files.map((file) => (
					<ProjectItem
						key={file.name}
						file={file}
						changeDir={getFiles}
						openFile={openFile}
					/>
				))}
			</div>

			<FilePreview file={content} />
		</div>
	);
}

function ProjectItem({
	file,
	changeDir,
	openFile,
}: {
	file: File;
	changeDir: (path: string) => void;
	openFile: (path: string) => void;
}) {
	return (
		<Button
			variant="ghost"
			className="flex items-center justify-start w-full"
			size="sm"
			onClick={() =>
				file.type === "dir" ? changeDir(file.path) : openFile(file.path)
			}
		>
			<div className="flex items-center gap-3">
				{file.type === "file" ? (
					<FileIcon className="size-4" />
				) : (
					<FolderIcon className="size-4" />
				)}
				<span className="text-sm">{file.name}</span>
			</div>
		</Button>
	);
}
