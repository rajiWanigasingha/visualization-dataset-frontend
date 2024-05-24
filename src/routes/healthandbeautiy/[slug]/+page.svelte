<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import gsap from 'gsap';

	export let data: PageData;

	const title = data.info.title;

	const total = data.info.totals;

	const branch = data.info.branch;

	onMount(() => {
		gsap.from('#total', {
			innerText: 0,
			duration: 5,
			snap: {
				innerText: 0.11
			}
		});

		gsap.from('#totalSales', {
			innerText: 0,
			duration: 5,
			snap: {
				innerText: 0.1
			}
		});
	});
</script>

<div>
	<div>
		<h1 class="text-2xl font-bold tracking-tight">{title}</h1>
		<p class="text-lg font-light">Explore about {title?.toLocaleLowerCase()}</p>
	</div>
	<Separator />
	<div class="flex flex-row gap-10 py-10">
		<div class="flex w-[320px] flex-col gap-5">
			<Card>
				<CardHeader>
					<CardTitle>Gross Income</CardTitle>
					<CardDescription>Pure Income After All The Cost</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						$ <samp id="total">{total.totalGrossIncome.toFixed(2)}</samp>
					</h1>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Total Income</CardTitle>
					<CardDescription>Total income with all sales</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						$ <samp id="total">{total.totalSalesIncome.toFixed(2)}</samp>
					</h1>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Total Const</CardTitle>
					<CardDescription>Total const form all sales</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						$ <samp id="total">{total.totalConst.toFixed(2)}</samp>
					</h1>
				</CardContent>
			</Card>
		</div>
		<div class="flex w-9/12 flex-col gap-5">
			<Card>
				<CardHeader>
					<CardTitle>Total Sales</CardTitle>
					<CardDescription>Total sales of health and beautiy product line</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						Total Sales : <samp id="totalSales">{total.totalSales}</samp>
					</h1>
				</CardContent>
			</Card>
			<div class="flex flex-row justify-between gap-5">
				{#each branch as data}
					<Card class="w-[250px]">
						<CardHeader>
							<CardTitle>Branch {data.branch}</CardTitle>
							<CardDescription>Total sales of branch {data.branch}</CardDescription>
						</CardHeader>
						<CardContent>
							<h1 class="text-2xl font-bold tracking-tight">
								Total Sales : <samp>{data.count}</samp>
							</h1>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</div>
