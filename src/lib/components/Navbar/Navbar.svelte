<script lang="ts">
	import { Store } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';
</script>

<div class="flex w-full flex-row justify-between p-3">
	<div class="flex flex-row items-center justify-center gap-1">
		<Store size={18} />
		<a href="/">
			<h1 class="text-lg font-bold">Supermarket</h1>
		</a>
	</div>
</div>
<Separator />
