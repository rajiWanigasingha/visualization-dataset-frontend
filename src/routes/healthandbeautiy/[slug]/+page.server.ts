import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { gql, request } from 'graphql-request';

interface Supermarket {
	_id: string;
	invoiceId: string;
	branch: string;
	city: string;
	customerType: string;
	gender: string;
	productLine: string;
	unitPrice: number;
	quantity: number;
	taxFive: number;
	total: number;
	date: string;
	time: string;
	payment: string;
	cogs: number;
	grossMarginPercentage: number;
	grossIncome: number;
	rating: number;
}

interface TypesOfGraphql {
	getAllDataByProductLine: Supermarket[];
}

const getAllProductTypes = gql`
	query GetAllDataByProductLine($productLine: String!) {
		getAllDataByProductLine(productLine: $productLine) {
			branch
			city
			customerType
			gender
			productLine
			unitPrice
			quantity
			total
			payment
			cogs
			grossIncome
			rating
		}
	}
`;

export const load = (async ({ params }) => {
	function returnTitle(values: string) {
		switch (values) {
			case '1':
				return 'Sporte And Travel';
			case '2':
				return 'Home And Lifestyle';
			case '3':
				return 'Health And Beauty';
			case '4':
				return 'Electronic Accessories';
			case '5':
				return 'Food And Beverages';
			case '6':
				return 'Fashion accessories';
		}
	}

	function getTypes() {
		if (params.slug === '1') {
			return 'Sports and travel';
		} else if (params.slug === '2') {
			return 'Home and lifestyle';
		} else if (params.slug === '3') {
			return 'Health and beauty';
		} else if (params.slug === '4') {
			return 'Electronic accessories';
		} else if (params.slug === '5') {
			return 'Food and beverages';
		} else if (params.slug === '6') {
			return 'Fashion accessories';
		} else {
			redirect(300, '/');
			return '';
		}
	}

	const variable = getTypes();

	// getting all the data
	const requestQl = (await request('http://localhost:8080/graphql', getAllProductTypes, {
		productLine: variable
	})) as TypesOfGraphql;

	const SupermarketData = requestQl.getAllDataByProductLine;

	function getTotals(supermarketData: Supermarket[]) {
		let totalGrossIncome = 0;
		let totalSalesIncome = 0;
		let totalConst = 0;
		let totalSales = 0;

		supermarketData.map((values) => {
			totalSalesIncome = totalSalesIncome + values.total;
			totalGrossIncome = totalGrossIncome + values.grossIncome;
			totalConst = totalConst + values.cogs;
			totalSales = totalSales + 1;
		});

		return {
			totalGrossIncome: totalGrossIncome,
			totalSalesIncome: totalSalesIncome,
			totalConst: totalConst,
			totalSales: totalSales
		};
	}

	const Totals = getTotals(SupermarketData);

	function getBranchData(supermarketData: Supermarket[]) {
		let branchData: { [key: string]: number[] } = {};

		supermarketData.map((val) => {
			if (!branchData[val.branch]) {
				branchData[val.branch] = [0];
			}

			branchData[val.branch][0] += 1;
		});

		return branchData;
	}

	const allSalesInBranch = [getBranchData(SupermarketData)];

	const branch = Object.entries(allSalesInBranch[0]).map(([key, value]) => {
		return {
			branch: key,
			count: value[0]
		};
	});

	return {
		info: {
			title: returnTitle(params.slug),
			totals: Totals,
			branch: branch
		}
	};
}) satisfies PageServerLoad;
