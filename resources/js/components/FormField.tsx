import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

interface FormFieldProps<TForm extends Record<string, unknown>>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	value: string;
	setData: (data: (previousData: TForm) => TForm) => void;
	error?: string;
}

const FormField = React.forwardRef<
	HTMLInputElement,
	FormFieldProps<Record<string, unknown>>
>(({ id, label, value, setData, error, ...props }, ref) => {
	return (
		<div className="space-y-1">
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				value={value}
				onChange={(e) =>
					setData((data) => ({
						...data,
						[id]: e.target.value,
					}))
				}
				ref={ref}
				{...props}
			/>
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	);
});

export default FormField;
