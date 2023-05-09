import { writable } from "svelte/store";

const VoteStore = writable(
    [
		{
			id: 1,
			question: 'TypeScript or JavaScript ?',
			answer_a: 'TypeScript',
			answer_b: 'JavaScript',
			vote_a: 10,
			vote_b: 20,
		}
	]
);

export default VoteStore;