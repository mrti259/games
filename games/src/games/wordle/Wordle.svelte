<script lang="ts">
  import { WordleService } from "./wordle-service";
  import WordleInstance from "./WordleInstance.svelte";

  let game = WordleService.newGame();
</script>

{#await game then [service, result]}
  <WordleInstance {service} {result} />
{/await}
