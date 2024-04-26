<script>
    import { onMount } from "svelte";

    let authUser;
    let numRows = 6;
    let numCols = 11;
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

    onMount(async () => {
        let user = await getUser();
        authUser = user;
    });





</script>