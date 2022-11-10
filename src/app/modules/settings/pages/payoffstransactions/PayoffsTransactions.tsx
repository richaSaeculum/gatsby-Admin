import { useEffect, useState } from 'react';

import { useLayout } from '../../../../../_metronic/layout/core';

import { getSuccessPayoffListApi } from '../../../../api';

import TransactionTable from './TransactionTable';

// const data = [
// 	{
// 		username: 'demouser1',
// 		payout: '1000',
// 		payoutMonth: 'July 2022',
// 		date: '31 July 2022',
// 		articles: 2
// 	},
// 	{
// 		username: 'demouser2',
// 		payout: '4000',
// 		payoutMonth: 'March 2022',
// 		date: '31 March 2022',
// 		articles: 4
// 	},
// 	{
// 		username: 'demouser3',
// 		payout: '1000',
// 		payoutMonth: 'July 2022',
// 		date: '31 July 2022',
// 		articles: 5
// 	},
// 	{
// 		username: 'demouser4',
// 		payout: '1000',
// 		payoutMonth: 'July 2022',
// 		date: '31 July 2022',
// 		articles: 2
// 	},
// 	{
// 		username: 'demouser5',
// 		payout: '1000',
// 		payoutMonth: 'July 2022',
// 		date: '31 July 2022',
// 		articles: 2
// 	},
// ]

const PayoffsTransactions = () => {

	const { setLoader } = useLayout();
	const [data, setData] = useState<any>();

	const [totalPage, setTotalPage] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const handlePageChange = async (selectedPage: number) => {
		await getSuccessPayoff({ page: selectedPage });
		setCurrentPage(selectedPage);
	}


	useEffect(() => {
		getSuccessPayoff({ page: currentPage });
	}, [])

	const getSuccessPayoff = async ({ page }: any) => {
		setLoader(true);
		let limit = 10;
		const res = await getSuccessPayoffListApi({ page, limit });
		if (res && res.status === 200) {
			setTotalPage(parseInt(res.data.pageCount));
			let a = res.data.payoffs.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * limit + index + 1 }) })
			setData(a);
			setLoader(false);
		}
	}

	return (
		<div>
			<TransactionTable
				data={data}
				paginationConfig={{ currentPage, totalPage, handlePageChange }}
			/>
		</div>
	)
}

export default PayoffsTransactions
