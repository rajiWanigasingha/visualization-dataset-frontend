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

interface branchTypes {
	branch: string;
	count: number;
}

interface DateSales {
	count: number;
	month: string;
}

interface GenderData {
	gender: string;
	count: number;
}

interface PaymentMethod {
	payment: string;
	count: number;
}

interface TypesOfGraphql {
	getRecordCount: number;
	getAllData: Supermarket[];
	getAllSalesOfBranches: branchTypes[];
	getAllDateSales: DateSales[];
	getAllGenderData: GenderData[];
	getAllPaymentData: PaymentMethod[];
}

const getAllProductTypes = gql`
	query GetAllData {
		getRecordCount
		getAllData {
			_id
			productLine
			unitPrice
			total
			cogs
			grossIncome
		}
		getAllSalesOfBranches {
			branch
			count
		}
		getAllDateSales {
			count
			month
		}
		getAllGenderData {
			gender
			count
		}
		getAllPaymentData {
			payment
			count
		}
	}
`;

const AllProducts: string[] = [];

const AllProductsUnitPricing: { [key: string]: number[] } = {};

let TotalIncome: number;

let TotalGrossIncome: number;

let TotalCost: number;

const Totals: { TotalIncome: number; TotalGrossIncome: number; TotalCost: number }[] = [
	{ TotalCost: 0, TotalGrossIncome: 0, TotalIncome: 0 }
];

export const load = (async () => {
	// Getting all data
	const requestQl = (await request(
		'http://localhost:8080/graphql',
		getAllProductTypes
	)) as TypesOfGraphql;

	// All Products and pricing of unit
	const productLineAndUniPricing = requestQl.getAllData;

	// All records sales
	const totalSales = requestQl.getRecordCount;

	// All barnch sales
	const totalBarnchSales = requestQl.getAllSalesOfBranches;

	// All sales in monthly
	const monthlySale = requestQl.getAllDateSales;

	// All gender data
	const genderData = requestQl.getAllGenderData;

	// All payment data
	const PaymentMethodData = requestQl.getAllPaymentData;

	// Get Data to show in pricing of productline and get totel income
	productLineAndUniPricing.map((values) => {
		// Get all product lins
		if (!AllProducts.includes(values.productLine)) {
			AllProducts.push(values.productLine);
		}

		// Get all productline unit pricing
		if (!AllProductsUnitPricing[values.productLine]) {
			AllProductsUnitPricing[values.productLine] = [];
		}

		AllProductsUnitPricing[values.productLine].push(values.unitPrice);

		// Get total income
		Totals[0].TotalIncome += values.total;

		// Get total gross income
		Totals[0].TotalGrossIncome += values.grossIncome;

		// Get total cost
		Totals[0].TotalCost += values.cogs;
	});

	const resultMap = Object.keys(AllProductsUnitPricing).map((productLine) => {
		return {
			productLine,
			unitPricing: AllProductsUnitPricing[productLine]
		};
	});

	console.log(Totals);

	// Sort gender data
	function sortGenderData(genderData: GenderData[]) {
		let gender: string[] = [];
		let count: number[] = [];
		genderData.map((values) => {
			gender.push(values.gender);
			count.push(values.count);
		});

		return [gender, count];
	}

	const GenderDataCount = sortGenderData(genderData);

	// Sort payment data
	function sortPaymentData(paymentData: PaymentMethod[]) {
		const paymentMethods: string[] = paymentData.map((item) => item.payment);
		const counts: number[] = paymentData.map((item) => item.count);

		return [paymentMethods, counts];
	}

	const dataPayment = sortPaymentData(PaymentMethodData);

	return {
		info: {
			productLineAndUniPricing: {
				AllProducts: AllProducts,
				resultMap: resultMap
			},
			Income: Totals,
			TotalSales: totalSales,
			AllBranchSales: totalBarnchSales,
			monthlySale: monthlySale,
			genderData: GenderDataCount,
			paymentData: dataPayment
		}
	};
}) satisfies PageServerLoad;
