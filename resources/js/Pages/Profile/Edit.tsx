import BaseLayout from "@/Layouts/BaseLayout";
import UpdateGithub from "@/Pages/Profile/Partials/UpdateGithub";
import { UpdateProfileInformationForm } from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

const Edit = () => {
	return (
		<>
			<Head title="Profile" />
			<div className="space-y-8">
				<UpdateProfileInformationForm />
				<UpdateGithub />
			</div>
		</>
	);
};

Edit.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Edit;
