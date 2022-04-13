<script context="module" lang="ts">
  import { dev } from '$app/env'

  export const hydrate = dev
  export const prerender = true
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="container">
  <h1>About</h1>
  <div class="content">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia, dolores consequatur quos hic commodi eum eius ex et laudantium quia dolore quidem aliquid tempore sit. A natus dolor sed!</p>
  </div>
</div>

<style>
	h1 {
		font-size: var(--font-24);
	}

	p {
		color: var(--color-text-muted);
	}

	.container {
		display: grid;
		gap: var(--spacing-8);
		padding: var(--spacing-16);
	}

	.content {
		display: grid;
		gap: var(--spacing-16);
	}
</style>