<script lang="ts">
  import { onMount } from "svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  let container: HTMLElement

  onMount(() => {
    const appView = data.appView as any as HTMLElement // TS will error because appView is ICanva by default
    appView.classList.add("rounded-lg")
    container.appendChild(appView)

    window.onkeydown = (e) => {
      if (!["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) return
      e.preventDefault()
      data.player.input(e.code)
    }

    window.onkeyup = (e) => {
      e.preventDefault()
      data.player.stop(e.code)
    }
  })
</script>

<div class="p-8 min-h-[75vh] space-y-8 max-w-screen-md mx-auto">
  <header class="space-y-2">
    <h2 class="h2 text-center">Foxy: Protect the House</h2>
    <p class="text-center">
      <a href="https://github.com/attbiz/foxy-pixijs-game" target="_blank">
        <i class="fa-brands fa-github" />
        <u>GitHub</u>
      </a>
    </p>
  </header>
  <div bind:this={container} class="mx-auto max-w-min rounded-lg" />
  <section class="text-center">
    <p>Your goal is to protect the house and collect gems.</p>
    <p>Use the arrow keys and spacebar to move around.</p>
    <p>Jump on enemies to kill them.</p>
  </section>
</div>
