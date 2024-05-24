<script>
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import '../app.css';
</script>

<div class="min-h-screen w-full bg-black">
	<Navbar />
	<div class="mt-5 px-16">
		<slot></slot>
	</div>
</div>

<style></style>
