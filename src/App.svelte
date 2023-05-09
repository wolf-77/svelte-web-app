<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Tabs from "./shared/Tabs.svelte";
	import VoteList from "./components/VoteList.svelte";
	import CreateVoteFrom from "./components/CreateVoteFrom.svelte";

	// tabs
	let items = ['Current Vote', 'Add Vote'];
	let activeItem = items[0];

	const _tabChange = (e) => {
		activeItem = e.detail;
	}

	// let polls = [
	// 	{
	// 		id: 1,
	// 		question: 'TypeScript or JavaScript ?',
	// 		answer_a: 'TypeScript',
	// 		answer_b: 'JavaScript',
	// 		vote_a: 10,
	// 		vote_b: 20,
	// 	}
	// ];

	const handleAdd = (e) => {
		// const poll = e.detail;
		// polls = [poll, ...polls];
		// console.log(polls);
		activeItem = items[0];
	};

	// const handleVote = (e) => {
		// const { id, option } = e.detail;
		// let copy_polls = [...polls];
		// let selected_poll = copy_polls.find((poll) => poll.id === id);

		// if(option == 'a') {
		// 	selected_poll.vote_a++;
		// }
		// if(option == 'b') {
		// 	selected_poll.vote_b++;
		// }

		// polls = copy_polls;
	// }



</script>

<Header />
<main>
	<Tabs {activeItem} {items}  on:changeTab={_tabChange}/>
	{#if activeItem === items[0]}
		<!-- <VoteList {polls} on:vote={handleVote}/> -->
		<VoteList />
	{:else if activeItem === items[1]}
		<CreateVoteFrom on:add={handleAdd} />
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}
</style>