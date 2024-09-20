<script lang="ts">
  import {
    Hint,
    type Guess,
    type WordleService,
    type SubmitResult,
  } from "./wordle-service";

  export let service: WordleService;
  export let result: SubmitResult;
  const keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  $: keyHints = keyboard.map((line) =>
    [...line].map((letter) => getHintForLetter(result, letter))
  );

  async function handleKeypress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      result = await service.submit(result.value);
    }
  }

  function reload() {
    window.location.reload();
  }

  function getClassForHint(hint: Hint): string {
    return hint === Hint.is
      ? "is"
      : hint === Hint.in
        ? "in"
        : hint === Hint.miss
          ? "miss"
          : "unknown";
  }

  function getHintForLetter(result: SubmitResult, letter: string): Guess[0] {
    const hints = result.guesses
      .flat()
      .filter(([char, _]) => char === letter)
      .map(([_, hint]) => hint)
      .sort();
    return [letter, hints[0]];
  }
</script>

<section>
  <header>
    {#if result.ended}
      <h3>
        {result.won ? "You won!" : "You lose!"}
      </h3>
      <p>The word was "{result.value}"</p>
      <button on:click={reload}>Play again!</button>
    {:else}
      <label>
        <div class="error">
          {result.error}
        </div>
        <input
          id="input"
          bind:value={result.value}
          on:keypress={handleKeypress}
        />
      </label>
    {/if}
  </header>

  {#each result.guesses as guess, j}
    <article>
      {#each guess as [letter, hint], i}
        <span
          class={getClassForHint(hint)}
          style:border-radius="var(--radius-blob-{((i + j) % 5) + 1})"
        >
          {letter}
        </span>
      {/each}
    </article>
  {/each}

  <footer>
    {#each keyHints as line, j}
      <article>
        {#each line as [letter, hint], i}
          <span
            class={getClassForHint(hint)}
            style:border-radius="var(--radius-drawn-{((i + j) % 2) + 1})"
          >
            {letter}
          </span>
        {/each}
      </article>
    {/each}
  </footer>
</section>

<style>
  section {
    text-align: center;
    vertical-align: middle;
  }

  header {
    margin-bottom: 1em;
  }

  footer {
    margin-top: 1em;
  }

  span {
    color: var(--sand-12);
    display: inline-block;
    width: 2em;
    height: 2em;
    margin: 0.1em;
  }

  .is {
    background-color: var(--lime-4);
  }

  .in {
    background-color: var(--yellow-4);
  }

  .miss {
    background-color: var(--sand-4);
  }

  .unknown {
    background-color: var(--sand-0);
  }

  .error {
    color: var(--red-9);
  }
</style>
