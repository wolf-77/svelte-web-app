<script>
    import PollDetails from "./PollDetails.svelte";
    import VoteStore from "../stores/VoteStore.js"
    // import { onMount, onDestroy } from "svelte";
    // for animations
    import { fade, slide, scale } from "svelte/transition";
    import { flip } from "svelte/animate";

    // =============================================================
    // export let polls = [];

    // const unsub = VoteStore.subscribe(data => {
    //     polls = data;
    // });

    // // ****************************
    // // not using in the moment
    // // onMount(() => {
    // //     console.log('mounted');
    // // });
    // // ****************************

    // onDestroy(() => {
    //     unsub();
    //     console.log('distroyed');
    // });

    // =============================================================
    // $VoteStore inside the each loop equals above code

</script>

<div class="poll-list">
    <!-- {#each polls as poll (poll.id)} -->
    {#each $VoteStore as poll (poll.id)}
        <div in:fade out:scale|local animate:flip={{duretion: 500}}>
            <PollDetails {poll} on:vote/>
        </div>
    {/each}
</div>

<style>
    .poll-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>