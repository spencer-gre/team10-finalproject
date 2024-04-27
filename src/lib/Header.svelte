<script>
	export let authUser;

	async function goToAdmin() {
		const res = await fetch("/admin", { method: "GET" });
		if (res.status == 200) {
			const html = location.replace("../../admin.html");
		}
	}
</script>

<div
	class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"
>
	<a class="btn btn-outline-primary" href="../">Back to Home</a>
	<h5 class="left my-0 mr-md-auto font-weight-normal">WPI Games</h5>
	<nav class="my-2 my-md-0 mr-md-3">
		<button
			type="button"
			class="btn btn-outline-primary"
			on:click={goToAdmin}>{authUser}</button
		>
	</nav>
	<a class="btn btn-outline-primary" href="../login.html">Log Out</a>
</div>
