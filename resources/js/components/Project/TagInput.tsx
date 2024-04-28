import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import FormField from "@/components/FormField";
import { usePage } from "@inertiajs/react";

type Props = {
    tags: string[];
    setData: (key: string, value: unknown) => void;
};

export default function TagInput({ tags, setData }: Props) {
    const [value, setValue] = useState("");
    const page = usePage();

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== "Enter") return;
        e.preventDefault();

        setValue("");

        if (tags.includes(value)) return;

        setData("tags", [...tags, value]);
    }

    return (
        <div>
            <FormField
                id="tags"
                label="Tags"
                value={value}
                setData={(_: string, value: unknown) =>
                    setValue(value as string)
                }
                onKeyDown={handleKeyDown}
                error={page.props.errors.tags}
                required
            />

            <TagList tags={tags} setData={setData} />
        </div>
    );
}

function TagList({
    tags,
    setData,
}: {
    tags: string[];
    setData: (key: string, value: unknown) => void;
}) {
    return (
        tags.length > 0 && (
            <div className="flex flex-wrap gap-1 w-96 mt-4">
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        onClick={() =>
                            setData(
                                "tags",
                                tags.filter((t) => t !== tag),
                            )
                        }
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
