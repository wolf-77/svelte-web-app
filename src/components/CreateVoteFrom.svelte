<script>
    import Button from "../shared/Button.svelte";
    import { createEventDispatcher } from "svelte";
    import VoteStore from "../stores/VoteStore";

    let dispatch = createEventDispatcher();
    let field = {
        question: '',
        answer_a: '',
        answer_b: ''
    };

    let errors = {
        question: '',
        answer_a: '',
        answer_b: ''
    };

    let valid = false;

    const submitHandle = () => {
        valid = true;

        // validate question
        if(field.question.trim().length < 5){
            valid = false;
            errors.question = 'Question must be longer than 5 characters';
        } else {
            errors.question = '';
        }

        // validate answer A
        if(field.answer_a.trim().length < 1){
            valid = false;
            errors.answer_a = 'Answer A must be longer than 1 characters';
        } else {
            errors.answer_a = '';
        }

        // validate answer B
        if(field.answer_b.trim().length < 1){
            valid = false;
            errors.answer_b = 'Answer B must be longer than 1 characters';
        } else {
            errors.answer_b = '';
        }

        // add new vote
        if(valid) {
            let poll = {
                ...field,
                vote_a: 0,
                vote_b: 0,
                id: Math.random()
            };
            VoteStore.update(currentPoll => {
                return [poll, ...currentPoll];
            });

            // dispatch('add', poll);
            dispatch('add');
        }

    };
</script>

<form on:submit|preventDefault={submitHandle}>
    <div class="form-field">
        <label for="question">Vote Question:</label>
        <input type="text" id="question" bind:value={field.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A:</label>
        <input type="text" id="answer-a" bind:value={field.answer_a}>
        <div class="error">{errors.answer_a}</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B:</label>
        <input type="text" id="answer-b" bind:value={field.answer_b}>
        <div class="error">{errors.answer_b}</div>
    </div>
    <Button type="secondary" flat={true}>Add Vote</Button>
</form>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    
    .form-field {
        margin: 18px auto;
    }

    input {
        width: 100%;
        border-radius: 6px;
    }

    label {
        margin: 10px auto;
        text-align: left;
    }

    .error {
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>