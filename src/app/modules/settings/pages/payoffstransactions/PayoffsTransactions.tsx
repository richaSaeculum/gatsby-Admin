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
	const [data, setData] = useState<any>([]);

	const [totalPage, setTotalPage] = useState<number>(0);
	const [totalPayoffs, setTotalPayoffs] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limitNo, setLimitNo] = useState<number>(10);

	const handlePageChange = async (selectedPage: number) => {
		await getSuccessPayoff({ page: selectedPage });
		setCurrentPage(selectedPage);
	}

	useEffect(() => {
		getSuccessPayoff({ page: currentPage });
	}, [limitNo])

	const getSuccessPayoff = async ({ page }: any) => {
		setLoader(true);
		try{const res = await getSuccessPayoffListApi({ page, limit: limitNo });
		if (res && res.status === 200) {
			setTotalPage(parseInt(res.data.pageCount));
			setTotalPayoffs(parseInt(res.data.payoffsTotal));
			let a = res?.data?.payoffs.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * limitNo + index + 1 }) })
			setData(a);
			setLoader(false);
			}
		} catch (err) {
			console.log(err)
		} finally {
			setLoader(false);
		}
	}

	return (
		<div>
			{data.length > 0 ? <TransactionTable
				data={data}
				paginationConfig={{ currentPage, totalPage, handlePageChange, totalPayoffs, limitNo, setLimitNo }}
			/> :
				<div className={`card`}>
					<div className='card-body py-3'>
						<h4 className='mb-0 text-center'>No record found</h4>
					</div>
				</div>
			}
		</div>
	)
}

export default PayoffsTransactions
