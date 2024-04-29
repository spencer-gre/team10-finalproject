<script>
	import { onMount } from "svelte";
	import Header from "./lib/Header.svelte";

	let authUser;
	let crosswordSelect;
	let crossword = [];
	let crosswordName;
	let userCrosswordData = [];
	let selectedButtons = [];
	
	let buttonsDisabled = false;
	let endMessage = "";
	let hintAcross = [];
	let hintDown = [];

	const getUser = async function () {
		const response = await fetch("/auth/user", {
			method: "GET",
		});
		let data = await response.json();
		return data.user;
	};

	// Get crossword data from the mongodb
	const getCrosswordData = async () => {
		const response = await fetch("/crosswordData");
		const data = await response.json();
		return data;
	};

	const checkCrossword = async function (event) {
		event.preventDefault();
		console.log(event);

		const crosswordForm = document.getElementById("crosswordForm");
		const inputs = crosswordForm.querySelectorAll("input");

		let validCount = 0;
		inputs.forEach((ele) => {
			if (ele.className.toLowerCase() === ele.value.toLowerCase()) {
				validCount++;
			}
		});

		console.log(validCount);

		crosswordForm.reset();

		const json = { name: crosswordName, count: validCount },
			body = JSON.stringify(json);
		const response = await fetch("/validateCrossword", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		});
		
		const res = await response.status;
		console.log(res);
	};

	const hintStrToArray = function (strHints){
		let hints = [];
		hints =  strHints.split('\n');
		return hints;
	}

	onMount(async () => {
		// crosswordData = rows.map((row) => row.split(""));
		crosswordSelect = await getCrosswordData(); // Assuming user's filled data is fetched separately
		crossword = crosswordSelect.cw;
		crosswordName = crosswordSelect.name;
		hintAcross = hintStrToArray(crosswordSelect.Across);
		hintDown = hintStrToArray(crosswordSelect.Down);

		// hintAcross = crosswordSelect.Across;
    	// hintDown = crosswordSelect.Down;
		

		let user = await getUser();
		authUser = user;
		console.log(crossword);
		console.log(hintAcross)
	});
</script>

<main>
	<body>
		<Header {authUser} />
		<p>{crosswordName}</p>
		<div class="container" id="crossword-container">
			<form id="crosswordForm">
				<table class="table table-reactive-sm">
					{#each Object.values(crossword) as row}
						<tr>
							{#each Object.values(row) as cell}
								{#if cell == "!"}
									<td class="bg-dark"></td>
								{:else}
									<td>
										<input
											style="width:100%"
											type="text"
											class={cell}
											name={cell}
											id={cell}
											value=''
										/>
									</td>
								{/if}
							{/each}
						</tr>
					{/each}
				</table>
				<button
					on:click={checkCrossword}
					type="submit"
					class="btn btn-lg btn-block btn-primary"
					value="check">Check Crossword</button>
			</form>
		</div>
		<div>
			<h2>Across Hints:</h2>
			<ul>
				{#each hintAcross as hint}
					<li>{hint}</li>
				{/each}
			</ul>
			<h2>Down Hints:</h2>
			<ul>
				{#each hintDown as hint}
					<li>{hint}</li>
				{/each}
			</ul>
		</div>
		{#if endMessage !== ""}
			<p>{endMessage}</p>
		{/if}
	</body>
</main>
