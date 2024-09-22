<script lang="ts">
  import { WordleService } from "./wordle-service";
  import Wordle from "./Wordle.svelte";

  export let lang: string;
  export let keyboard: string[];
  let game = WordleService.newGame(lang);
</script>

{#await game then [service, result]}
  <Wordle {service} {result} {keyboard} />
{/await}
