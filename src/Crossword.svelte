<script>
	import { onMount } from "svelte";

	let authUser;
	let crosswordSelect;
	let crossword = [];
	let crosswordName;
	let userCrosswordData = [];
	let selectedButtons = [];
	let buttonsDisabled = false;
	let endMessage = "";
	let cluesAcross = [
		"3. Number of original WPI founders",
		"4. Acronym for the interdisciplinary project typically done off-campus",
		"5. Original name of the Innovation Studio",
	];
	let cluesDown = [
		"1. Last name of the previous president of WPI",
		"2. Newest acaedmic building on campus",
	];

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

	

	const checkHangman = async function (event) {
		event.preventDefault();
		console.log(event);

    const crosswordForm = document.getElementById("crosswordForm");
    const inputs = crosswordForm.querySelectorAll("input");
    
    let validCount = 0;
    inputs.forEach(ele => {
      if (ele.id.toUpperCase == ele.value.toUpperCase) {
        validCount += 1;
      }
    })

    crosswordForm.reset();

    const json = { name: crosswordName, count: validCount },
      body = JSON.stringify(json);
    const response = await fetch ("/validateCrossword", {
      method: "POST",
			headers: { "Content-Type": "application/json" },
      body,
    });

		const data = await response.json();
		return data;
    
	};

	onMount(async () => {
		// crosswordData = rows.map((row) => row.split(""));
		crosswordSelect = await getCrosswordData(); // Assuming user's filled data is fetched separately
		crossword = crosswordSelect.cw;
		crosswordName = crosswordSelect.name;

		let user = await getUser();
		authUser = user;
		console.log(crossword);
	});
</script>

<div id="crossword-container">
	<form id="crosswordForm">
		<table class="table table-sm">
			{#each Object.values(crossword) as row}
				<tr>
					{#each Object.values(row) as cell}
						{#if cell == "!"}
							<td class="bg-dark"></td>
						{:else}
							<td>
								<input type="text" class="input-group-sm" name="" id={cell} />
							</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</table>
		<button
			on:click={checkHangman}
			type="submit"
			class="btn btn-lg btn-block btn-primary"
			value="check">Check Hangman</button
		>
	</form>
</div>

{#if endMessage !== ""}
	<p>{endMessage}</p>
{/if}
