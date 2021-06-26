<script>
  import router from "page";
  import "tailwindcss/tailwind.css";
  import "./firebase";

  import Homepage from "./Homepage.svelte";
  import Card from "./Card.svelte";

  let page;
  router("/", () => (page = Homepage));
  router("/:card", () => (page = Card));

  router.start();
</script>

<svelte:component this={page} />
