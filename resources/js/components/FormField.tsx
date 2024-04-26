import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	value: string;
	setData: (key: string, value: unknown) => void;
	error?: string;
	required?: boolean;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
	({ id, label, value, setData, error, required = false, ...props }, ref) => {
		return (
			<div className="space-y-1 w-full">
				<Label htmlFor={id} required={required}>
					{label}
				</Label>
				<Input
					id={id}
					value={value}
					onChange={(e) => setData(id, e.target.value)}
					ref={ref}
					{...props}
				/>
				{error && <span className="text-red-500 text-sm">{error}</span>}
			</div>
		);
	},
);

export default FormField;
