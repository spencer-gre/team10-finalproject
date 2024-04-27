<script>
  import { onMount } from "svelte";

  let authUser;
  let numRows = 6; //number of rows
  let numCols = 11; //number of cols
  let crosswordData = [];
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
    const response = await fetch("/getCrosswordData");
    const data = await response.json();
    return data;
  };

  const checkCrosswordCompletion = () => {
    const filledCrossword = crosswordData
      .flat()
      .filter((cell) => cell !== "!")
      .join("");
    const solution = userCrosswordData
      .flat()
      .filter((cell) => cell !== "!")
      .join("");
    if (filledCrossword === solution) {
      endMessage = "Congratulations! You completed the crossword!";
    }
  };

  // Function to handle user input
  const handleInput = function (rowIndex, colIndex, value) {
    if (crosswordData[rowIndex][colIndex] === value) {
      userCrosswordData[rowIndex][colIndex] = value;
      checkCrosswordCompletion();
    }
    console.log(rowIndex);
  };

  onMount(async () => {
    const rows = [
      "!!!!l!!!!!!",
      "!!!!e!!!u!!",
      "!!!!seven!!",
      "!!!!h!!!iqp",
      "foisie!!t!!",
      "!!!!n!!!y!!",
    ];
    crosswordData = rows.map((row) => row.split(""));
    userCrosswordData = await getCrosswordData(); // Assuming user's filled data is fetched separately
    let user = await getUser();
    authUser = user;
  });
</script>

<div id="crossword-container">
  <table class="table">
    {#each crosswordData as row, rowIndex}
      <tr>
        {#each row as cell, colIndex}
          {#if cell == "!"}
            <td class="table-dark"></td>
          {:else}
            <td>
              <input
                on:input={handleInput}
                type="text"
                class="input-group-sm"
                name=""
                id={cell}
              />
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </table>
</div>

<!-- 
  <div>
  <ol>
    {#each clues as descr}
      <li>{descr}</li>

    {/each}
  </ol>
</div> -->

{#if endMessage !== ""}
  <p>{endMessage}</p>
{/if}
