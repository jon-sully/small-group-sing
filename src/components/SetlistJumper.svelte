<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { cn } from "../lib/utils/cn";

  type Props = {
    songs: Array<CollectionEntry<"songs">>;
  };

  let { songs }: Props = $props();

  let open = $state(false);
  let songElements: HTMLElement[] = $state([]);
  let songInView: string | undefined = $state();

  onMount(() => {
    for (let song of songs) {
      const el = document.getElementById(song.slug);
      if (!el) continue;
      songElements.push(el);
    }

    updateInView();
    window.addEventListener("scroll", updateInView);

    return () => {
      window.removeEventListener("scroll", updateInView);
    };
  });

  function updateInView() {
    if (window.scrollY === 0) {
      songInView = undefined;
      return;
    }

    let nextValue = undefined;
    for (let el of songElements) {
      var rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        nextValue = el.id;
      } else if (rect.bottom <= window.innerHeight && rect.bottom > 0) {
        nextValue = el.id;
      } else if (rect.top < 0 && rect.bottom > window.innerHeight) {
        nextValue = el.id;
      }
    }
    songInView = nextValue;
  }

  function scrollToSong(songId: string, onDone?: () => void) {
    const songElement = document.getElementById(songId);
    if (!songElement) return;
    songElement.scrollIntoView({ behavior: "smooth" });
    onDone?.();
  }
</script>

{#snippet topIcon()}
  <svg
    class="h-4 w-4 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 6v13m0-13 4 4m-4-4-4 4"
    ></path>
  </svg>
{/snippet}

{#snippet songIcon()}
  <svg
    class="h-4 w-4 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fill-rule="evenodd"
      d="M17.316 4.052a.99.99 0 0 0-.9.14c-.262.19-.416.495-.416.82v8.566a4.573 4.573 0 0 0-2-.464c-1.99 0-4 1.342-4 3.443 0 2.1 2.01 3.443 4 3.443 1.99 0 4-1.342 4-3.443V6.801c.538.5 1 1.219 1 2.262 0 .56.448 1.013 1 1.013s1-.453 1-1.013c0-1.905-.956-3.18-1.86-3.942a6.391 6.391 0 0 0-1.636-.998 4 4 0 0 0-.166-.063l-.013-.005-.005-.002h-.002l-.002-.001ZM4 5.012c-.552 0-1 .454-1 1.013 0 .56.448 1.013 1 1.013h9c.552 0 1-.453 1-1.013 0-.559-.448-1.012-1-1.012H4Zm0 4.051c-.552 0-1 .454-1 1.013 0 .56.448 1.013 1 1.013h9c.552 0 1-.454 1-1.013 0-.56-.448-1.013-1-1.013H4Zm0 4.05c-.552 0-1 .454-1 1.014 0 .559.448 1.012 1 1.012h4c.552 0 1-.453 1-1.012 0-.56-.448-1.013-1-1.013H4Z"
      clip-rule="evenodd"
    />
  </svg>
{/snippet}

{#snippet rightIcon()}
  <svg
    class="w-4 h-4 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="m10 16 4-4-4-4"
    />
  </svg>
{/snippet}

<Button
  id="jumper-menu-btn"
  color="purple"
  pill={true}
  class="h-11 w-11 flex p-2"
>
  {#if !open}
    <svg
      class="text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
        d="M5 7h14M5 12h14M5 17h14"
      ></path>
    </svg>
  {:else}
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    </svg>
  {/if}
</Button>
<Dropdown
  triggeredBy="#jumper-menu-btn"
  class="py-2"
  placement="top-start"
  bind:open
>
  <DropdownItem
    class={cn("flex items-center gap-2")}
    on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    disabled={!songInView}
  >
    {@render topIcon()}
    Scroll to Top
  </DropdownItem>
  {#each songs as song}
    <DropdownItem
      class={cn(
        "flex items-center gap-2 ",
        "flex items-center gap-2 hover:!bg-purple-800",
        songInView === song.slug && "bg-purple-800",
      )}
      on:click={(e) =>
        scrollToSong(song.slug, () => {
          if (e.target instanceof HTMLElement)
            e.target.style.pointerEvents = "none";
        })}
    >
      {#if songInView === song.slug}
        {@render rightIcon()}
      {:else}
        {@render songIcon()}
      {/if}
      <div class="flex flex-col">
        <span>{song.data.title}</span>
        <span class="text-gray-400 text-xs italic">{song.data.artist}</span>
      </div>
    </DropdownItem>
  {/each}
</Dropdown>
