<!-- src/routes/index.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import type { DataTitle } from 'plotly.js';
	import { Button } from '$lib/components/ui/button';
	import gsap from 'gsap';

	interface DateSales {
		count: number;
		month: string;
	}

	export let data: PageData;

	function getRandomColor(): string {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return `rgb(${r}, ${g}, ${b})`;
	}

	function generateRandomColors(length: number): string[] {
		const colors: string[] = [];
		for (let i = 0; i < length; i++) {
			colors.push(getRandomColor());
		}
		return colors;
	}

	const ProductLine = data.info.productLineAndUniPricing.AllProducts;

	const ProductLinePricing = data.info.productLineAndUniPricing.resultMap;

	const colorsOfProducts = generateRandomColors(ProductLine.length);

	const allBranchData = data.info.AllBranchSales;

	const allMonthlyData = data.info.monthlySale;

	const genderData = data.info.genderData;

	const paymentData = data.info.paymentData;

	const monthOrder: string[] = [
		'JANUARY',
		'FEBRUARY',
		'MARCH',
		'APRIL',
		'MAY',
		'JUNE',
		'JULY',
		'AUGUST',
		'SEPTEMBER',
		'OCTOBER',
		'NOVEMBER',
		'DECEMBER'
	];

	// Sort the array based on the desired order of months
	allMonthlyData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

	const month: string[] = [];
	const count: number[] = [];

	allMonthlyData.map((val) => {
		month.push(val.month);
		count.push(val.count);
	});

	const y: number[] = [];

	for (let index = 1; index <= 400; index++) {
		y.push(index);
	}

	onMount(async () => {
		const Plotly = await import('plotly.js-dist-min');

		Plotly.newPlot(
			'Health_and_beauty',
			[
				{
					x: [...ProductLinePricing[0].unitPricing],
					y: y,
					mode: 'markers',
					type: 'scatter',
					marker: {
						color: y,
						colorscale: 'RdBu'
					}
				}
			],
			{
				height: 550,
				width: 550,
				xaxis: { title: 'Pricing of a one product (dollers)' },
				yaxis: { title: 'Count of products' },
				title: (ProductLinePricing[0].productLine + ' Product Line') as Partial<DataTitle>,
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612'
			}
		);

		Plotly.newPlot(
			'Electronic_accessories',
			[
				{
					x: [...ProductLinePricing[1].unitPricing],
					y: y,
					mode: 'markers',
					type: 'scatter',
					marker: {
						color: y,
						colorscale: 'Portland'
					}
				}
			],
			{
				height: 550,
				width: 550,
				xaxis: { title: 'Pricing of a one product (dollers)' },
				yaxis: { title: 'Count of products' },
				title: (ProductLinePricing[1].productLine + ' Product Line') as Partial<DataTitle>,
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612'
			}
		);

		Plotly.newPlot(
			'Home_and_lifestyle',
			[
				{
					x: [...ProductLinePricing[2].unitPricing],
					y: y,
					mode: 'markers',
					type: 'scatter',
					marker: {
						color: y,
						colorscale: 'Hot'
					}
				}
			],
			{
				height: 550,
				width: 550,
				xaxis: { title: 'Pricing of a one product (dollers)' },
				yaxis: { title: 'Count of products' },
				title: (ProductLinePricing[2].productLine + ' Product Line') as Partial<DataTitle>,
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612'
			}
		);

		Plotly.newPlot(
			'Sports_and_travel',
			[
				{
					x: [...ProductLinePricing[3].unitPricing],
					y: y,
					mode: 'markers',
					type: 'scatter',
					marker: {
						color: y,
						colorscale: 'Jet'
					}
				}
			],
			{
				height: 550,
				width: 550,
				xaxis: { title: 'Pricing of a one product (dollers)' },
				yaxis: { title: 'Count of products' },
				title: (ProductLinePricing[3].productLine + ' Product Line') as Partial<DataTitle>,
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612'
			}
		);

		Plotly.newPlot(
			'Food_and_beverages',
			[
				{
					x: [...ProductLinePricing[4].unitPricing],
					y: y,
					mode: 'markers',
					type: 'scatter',
					marker: {
						color: y
					}
				}
			],
			{
				height: 550,
				width: 550,
				xaxis: { title: 'Pricing of a one product (dollers)' },
				yaxis: { title: 'Count of products' },
				title: (ProductLinePricing[4].productLine + ' Product Line') as Partial<DataTitle>,
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612'
			}
		);

		Plotly.newPlot(
			'Fashion_accessories',
			[
				{
					x: [...ProductLinePricing[5].unitPricing],
					y: y,
					mode: 'markers',
					type: 'scatter',
					marker: {
						color: y,
						colorscale: 'YlGnBu'
					}
				}
			],
			{
				height: 550,
				width: 550,
				xaxis: { title: 'Pricing of a one product (dollers)' },
				yaxis: { title: 'Count of products' },
				title: (ProductLinePricing[5].productLine + ' Product Line') as Partial<DataTitle>,
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612'
			}
		);

		Plotly.newPlot(
			'MontlySales',
			[
				{
					x: month,
					y: count,
					type: 'bar',
					marker: {
						color: colorsOfProducts
					}
				}
			],
			{
				xaxis: { title: 'Month' },
				yaxis: { title: 'Sales' },
				title: 'Monthly Sales',
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612',
				font: {
					family:
						'ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji'
				}
			}
		);

		Plotly.newPlot(
			'genderData',
			[
				{
					x: genderData[0],
					y: genderData[1],
					type: 'bar'
				}
			],
			{
				xaxis: { title: 'Gender' },
				yaxis: { title: 'Total unit sold' },
				title: 'Total coustomer base sort by gender',
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612',
				font: {
					family:
						'ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji'
				}
			}
		);

		Plotly.newPlot(
			'paymentData',
			[
				{
					x: paymentData[0],
					y: paymentData[1],
					type: 'bar'
				}
			],
			{
				xaxis: { title: 'Payment Method' },
				yaxis: { title: 'Total payments' },
				title: 'Most used payment methods',
				paper_bgcolor: '#020612',
				plot_bgcolor: '#020612',
				font: {
					family:
						'ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji'
				}
			}
		);

		gsap.from('#storage_number', {
			innerText: 0,
			duration: 5,
			snap: {
				innerText: 0.11
			}
		});

		gsap.from('#total', {
			innerText: 0,
			duration: 5,
			snap: {
				innerText: 0.1
			}
		});
	});
</script>

<div class="w-full pb-10">
	<div class="flex w-full flex-row justify-center gap-10">
		<div class="flex w-[330px] flex-col gap-5">
			<Card>
				<CardHeader>
					<CardTitle>Gross Income</CardTitle>
					<CardDescription>Pure Income After All The Cost</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						$ <samp id="storage_number">{data.info.Income[0].TotalGrossIncome.toFixed(2)}</samp>
					</h1>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Total Income</CardTitle>
					<CardDescription>Total Income Of All Sales</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						$ <samp id="storage_number">{data.info.Income[0].TotalIncome.toFixed(2)}</samp>
					</h1>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Total Const</CardTitle>
					<CardDescription>Total Const Of All Sales</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						$ <samp id="storage_number">{data.info.Income[0].TotalCost.toFixed(2)}</samp>
					</h1>
				</CardContent>
			</Card>
		</div>
		<div class="flex w-7/12 flex-col gap-5">
			<Card>
				<CardHeader>
					<CardTitle>Supermarket Product Line</CardTitle>
					<CardDescription>All types of product lines in our supermaket</CardDescription>
				</CardHeader>
				<CardContent>
					{#each ProductLine as product, index}
						<div class="flex flex-row items-center gap-2 pb-2">
							<div
								class={`h-[16px] w-[16px]`}
								style={`background-color: ${colorsOfProducts[index]};`}
							></div>
							<h1 class="font-semibold">{product}</h1>
						</div>
					{/each}
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Total Sales</CardTitle>
					<CardDescription>Total sales done till today</CardDescription>
				</CardHeader>
				<CardContent>
					<h1 class="text-5xl font-bold tracking-tight">
						Total Sales : <samp id="total">{data.info.TotalSales}</samp>
					</h1>
				</CardContent>
			</Card>
			<div class="flex flex-row gap-2">
				{#each allBranchData as barnchData}
					<Card class="w-[230px]">
						<CardHeader>
							<CardTitle>Barnch {barnchData.branch} Total Sales</CardTitle>
							<CardDescription>Total sales of barnch {barnchData.branch}</CardDescription>
						</CardHeader>
						<CardContent>
							<h1 class="text-3xl font-bold tracking-tight">{barnchData.count}</h1>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-5 flex w-full justify-center">
		<div class="w-11/12 rounded-lg border bg-[#020612] p-2">
			<div class="h-[500px] w-full bg-black font-bold" id="MontlySales"></div>
		</div>
	</div>

	<div class="mt-5 flex w-full flex-row justify-center gap-10">
		<div class="w-[500px] rounded-lg border bg-[#020612] p-2">
			<div class="h-[400px] w-full bg-black font-bold" id="genderData"></div>
		</div>
		<div class="w-[500px] rounded-lg border bg-[#020612] p-2">
			<div class="h-[400px] w-full bg-black font-bold" id="paymentData"></div>
		</div>
	</div>

	<div class="mt-5 flex flex-wrap gap-4">
		<div class="rounded-lg border bg-[#020612] p-2">
			<div class="Health_and_beauty" id="Health_and_beauty">
				<div class="py-3">
					<Button class="w-[300px] bg-blue-600 hover:bg-blue-700" href="/healthandbeautiy/3"
						>Explore More</Button
					>
				</div>
			</div>
		</div>
		<div class="rounded-lg border bg-[#020612] p-2">
			<div class="Electronic_accessories" id="Electronic_accessories">
				<div class="py-3">
					<Button class="w-[300px] bg-blue-600 hover:bg-blue-700" href="/healthandbeautiy/4"
						>Explore More</Button
					>
				</div>
			</div>
		</div>
		<div class="rounded-lg border bg-[#020612] p-2">
			<div class="Home_and_lifestyle" id="Home_and_lifestyle">
				<div class="py-3">
					<Button class="w-[300px] bg-blue-600 hover:bg-blue-700" href="/healthandbeautiy/2"
						>Explore More</Button
					>
				</div>
			</div>
		</div>
		<div class="rounded-lg border bg-[#020612] p-2">
			<div class="Sports_and_travel" id="Sports_and_travel">
				<div class="py-3">
					<Button class="w-[300px] bg-blue-600 hover:bg-blue-700" href="/healthandbeautiy/1"
						>Explore More</Button
					>
				</div>
			</div>
		</div>
		<div class="rounded-lg border bg-[#020612] p-2">
			<div class="Food_and_beverages" id="Food_and_beverages">
				<div class="py-3">
					<Button class="w-[300px] bg-blue-600 hover:bg-blue-700" href="/healthandbeautiy/5"
						>Explore More</Button
					>
				</div>
			</div>
		</div>
		<div class="rounded-lg border bg-[#020612] p-2">
			<div class="Fashion_accessories" id="Fashion_accessories">
				<div class="py-3">
					<Button class="w-[300px] bg-blue-600 hover:bg-blue-700" href="/healthandbeautiy/6"
						>Explore More</Button
					>
				</div>
			</div>
		</div>
	</div>
</div>
