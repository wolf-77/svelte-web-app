<script>
    import Card from "../shared/Card.svelte";
    import VoteStore from "../stores/VoteStore";
    import Button from "../shared/Button.svelte";
    import { tweened } from "svelte/motion";
    // import { createEventDispatcher } from "svelte";

    // let dispatch = createEventDispatcher();
    export let poll;
    $: totalVotes = poll.vote_a + poll.vote_b;
    $: percent_a = Math.floor(100 / totalVotes * poll.vote_a) || 0;
    $: percent_b = Math.floor(100 / totalVotes * poll.vote_b) || 0;


    const tweened_a = tweened(0)
    const tweened_b = tweened(0)
    $: tweened_a.set(percent_a);
    $: tweened_b.set(percent_b);


    const handleVote = (option, id) => {
        // dispatch('vote', { option, id })
        
        VoteStore.update((currentPolls) => {
            let copy_polls = [...currentPolls];
            let selected_poll = copy_polls.find((poll) => poll.id === id);

            if(option == 'a') {
                selected_poll.vote_a++;
            }
            if(option == 'b') {
                selected_poll.vote_b++;
            }

            return copy_polls;
        });

    };

    const handleDelete = (id) => {
        VoteStore.update(currentPolls => {
            return currentPolls.filter(poll => poll.id != id);
        });
    };

</script>

<Card>
    <div class="poll">
        <h3>{poll.question}</h3>
        <p>Total votes : {totalVotes}</p>
        <!--Answer A-->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={() => handleVote('a', poll.id)}>
            <div class="percent percent-a" style="width: {$tweened_a}%;"></div>
            <span>{poll.answer_a} ({poll.vote_a})</span>
        </div>
        <!--Answer B-->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={() => handleVote('b', poll.id)}>
            <div class="percent percent-b" style="width: {$tweened_b}%;"></div>
            <span>{poll.answer_b} ({poll.vote_b})</span>
        </div>
        <div class="delete">
            <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
        </div>
    </div>
</Card>

<style>
    h3 {
        margin: 0 auto;
        color: #555;
    }

    p {
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }

    .answer {
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }

    .answer:hover {
        opacity: 0.6;
    }

    span {
        display: inline-block;
        padding: 10px 20px;
    }

    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }

    .percent-a {
        border-left: 4px solid #d91b42;
        background-color: rgba(217, 27, 66, 0.2);
    }

    .percent-b {
        border-left: 4px solid #45c496;
        background-color: rgba(69, 169, 150, 0.2);
    }

    .delete {
        margin-top: 30px;
        text-align: center;
    }
</style>