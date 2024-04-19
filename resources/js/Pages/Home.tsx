import BaseLayout from "@/Layouts/BaseLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Home = () => {
	return (
		<>
			<Head title="Home" />
			<div>home</div>
		</>
	);
};

Home.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Home;
