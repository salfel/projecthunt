import { Badge } from "@/components/ui/badge";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { Atom } from "jotai";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	defaultTags: string[];
	tagsAtom: Atom<string[]>;
};

export default function TagInput({ defaultTags, tagsAtom }: Props) {
	return (
		<div>
			<TagCommand defaultTags={defaultTags} tagsAtom={tagsAtom} />

			<BadgeList tagsAtom={tagsAtom} />
		</div>
	);
}

function TagCommand({
	defaultTags,
	tagsAtom,
}: {
	defaultTags: string[];
	tagsAtom: Atom<string[]>;
}) {
	const [tags, setTags] = useAtom(tagsAtom);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const command = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function checkClickedOutside(event: MouseEvent) {
			// @ts-ignore
			if (open && !command.current?.contains(event.target)) {
				setOpen(false);
			}
		}

		function checkEscape(event: KeyboardEvent) {
			if (open && event.key === "Escape") {
				setOpen(false);
			}
		}

		document.addEventListener("click", checkClickedOutside);
		document.addEventListener("keydown", checkEscape);
		return () => {
			document.removeEventListener("click", checkClickedOutside);
			document.removeEventListener("keydown", checkEscape);
		};
	}, [open]);

	return (
		<Command
			className="relative overflow-visible w-96 rounded-md border border-zinc-800"
			ref={command}
		>
			<CommandInput
				id="tags"
				value={value}
				onFocus={() => setOpen(true)}
				onValueChange={(value) => {
					setValue(value);
					setOpen(true);
				}}
				placeholder="Search tags..."
			/>
			<CommandList
				className={cn(
					"absolute top-12 w-96 bg-white dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800 hide-scrollbar",
					!open && "hidden",
				)}
			>
				<CommandEmpty>No framework found.</CommandEmpty>
				<CommandGroup>
					{defaultTags
						.filter((t) => !tags.includes(t))
						.map((tag) => (
							<CommandItem
								key={tag}
								value={tag}
								onSelect={(currentValue) => {
									setTags([...tags, currentValue]);
									setOpen(false);
									setValue("");
								}}
							>
								{tag}
							</CommandItem>
						))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

function BadgeList({
	tagsAtom,
}: {
	tagsAtom: Atom<string[]>;
}) {
	const [tags, setTags] = useAtom(tagsAtom);

	return (
		tags.length > 0 && (
			<div className="flex flex-wrap gap-1 w-96 mt-4">
				{tags.map((tag) => (
					<Badge
						key={tag}
						onClick={() => setTags(tags.filter((t) => t !== tag))}
						className="cursor-pointer"
						variant="secondary"
					>
						{tag}
					</Badge>
				))}
			</div>
		)
	);
}
