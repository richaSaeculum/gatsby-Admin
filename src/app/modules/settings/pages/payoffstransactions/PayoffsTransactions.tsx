import React from 'react'
import TransactionTable from './TransactionTable'

const data = [
    {
        username: 'demouser1',
        payout: '1000',
        payoutMonth: 'July 2022',
        date: '31 July 2022',
        articles: 2
    },
    {
        username: 'demouser2',
        payout: '4000',
        payoutMonth: 'March 2022',
        date: '31 March 2022',
        articles: 4
    },
    {
        username: 'demouser3',
        payout: '1000',
        payoutMonth: 'July 2022',
        date: '31 July 2022',
        articles: 5
    },
    {
        username: 'demouser4',
        payout: '1000',
        payoutMonth: 'July 2022',
        date: '31 July 2022',
        articles: 2
    },
    {
        username: 'demouser5',
        payout: '1000',
        payoutMonth: 'July 2022',
        date: '31 July 2022',
        articles: 2
    },
]

const PayoffsTransactions = () => {
    return (
        <div>
            <TransactionTable
                data={data}
            />
        </div>
    )
}

export default PayoffsTransactions
