<script>
    import { onMount } from "svelte";

    let authUser;
    let numRows = 6;        //number of rows
    let numCols = 11;       //number of cols
    let crosswordData = []; 
    let userCrosswordData = [];
    let selectedButtons = [];
    let buttonsDisabled = false;
    let endMessage = ""

    const getUser = async function () {
        const response = await fetch("/auth/user", {
        method: "GET",
        });
        let data = await response.json();
        return data.user;
    };

    // Get crossword data from the mongodb
    const getCrosswordData = async () => {
        const response = await fetch("/getCrosswordData"); // Assuming you have an API endpoint to fetch crossword data
        const data = await response.json();
        return data;
    };

    const checkCrosswordCompletion = () => {
        const filledCrossword = crosswordData.flat().filter(cell => cell !== '!').join('');
        const solution = userCrosswordData.flat().filter(cell => cell !== '!').join('');
        if (filledCrossword === solution) {
            endMessage = "Congratulations! You completed the crossword!";
        }
    };

    // Function to handle user input
    const handleInput = (rowIndex, colIndex, value) => {
        if (crosswordData[rowIndex][colIndex] === value) {
            checkCrosswordCompletion();
        }
    };

    onMount(async () => {
        const rows = [
            "!!!!l!!!!!!",
            "!!!!e!!!u!!",
            "!!!!seven!!",
            "!!!!h!!!iqp",
            "foisie!!t!!",
            "!!!!n!!!y!!"
        ];
        crosswordData = rows.map(row => row.split(''));
        userCrosswordData = await getCrosswordData(); // Assuming user's filled data is fetched separately
        let user = await getUser();
        authUser = user;
    });

    
</script>

<div id="crossword-container">
    {#each crosswordData as row, rowIndex}
      <div class="row">
        {#each row as cell, colIndex}
          {#if cell === '!' } 
            <div class="cell black"></div>
          {:else}
            <input
              type="text"
              class="cell"
              bind:value={crosswordData[rowIndex][colIndex]}
              on:input={() => handleInput(rowIndex, colIndex, event.target)}
              readonly={cell !== ''}
            />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
  
  {#if endMessage !== ''}
    <p>{endMessage}</p>
  {/if}