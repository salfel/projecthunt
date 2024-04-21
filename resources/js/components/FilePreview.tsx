import type { FileContent } from "@/types";
import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeRaw from "rehype-raw";

export default function FilePreview({ file }: { file: FileContent }) {
	return (
		file && (
			<div className="flex-1">
				{file.fileType === "md" ? (
					<div className="prose prose-zinc dark:prose-invert">
						<ReactMarkdown rehypePlugins={[rehypeRaw]}>
							{file.content}
						</ReactMarkdown>
					</div>
				) : (
					<SyntaxHighlighter
						customStyle={{ width: "100%" }}
						language={file.fileType}
						style={atomOneDark}
						wrapLongLines={true}
					>
						{file.content}
					</SyntaxHighlighter>
				)}
			</div>
		)
	);
}
