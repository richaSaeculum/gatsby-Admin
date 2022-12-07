import moment from 'moment';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useLayout } from '../../../../../_metronic/layout/core';

import { getPayoffsByMonthApi, makePayoutApi } from '../../../../api';

import ConfirmationModal from '../../../../components/modal/ConfirmationModal';

const listData = [
  {
    "user_name": "admin-gatsby-local",
    "user_first_name": "Admin",
    "user_last_name": "Gatsby",
    "userid": 1,
    "total_article": 0,
    "amount": 0,
    "articles": [
      {
        "id": null,
        "amount": 1000
      },
      {
        "id": null,
        "amount": 100
      },
      {
        "id": null,
        "amount": 500
      },
      {
        "id": null,
        "amount": 100
      }
    ]
  },
  {
    "user_name": "admin-gatsby-local-2",
    "user_first_name": "Admin",
    "user_last_name": "Gatsby",
    "userid": 2,
    "total_article": 0,
    "amount": 1000,
    "articles": [
      {
        "id": null,
        "amount": 1000
      },
      {
        "id": null,
        "amount": 100
      },
      {
        "id": null,
        "amount": 500
      },
      {
        "id": null,
        "amount": 100
      }
    ]
  },
  {
    "user_name": "admin-gatsby-local-3",
    "user_first_name": "Admin",
    "user_last_name": "Gatsby",
    "userid": 3,
    "total_article": 0,
    "amount": 0,
    "articles": [
      {
        "id": null,
        "amount": 1000
      },
      {
        "id": null,
        "amount": 100
      },
      {
        "id": null,
        "amount": 500
      },
      {
        "id": null,
        "amount": 100
      }
    ]
  },
  {
    "user_name": "admin-gatsby-local4",
    "user_first_name": "Admin",
    "user_last_name": "Gatsby",
    "userid": 4,
    "total_article": 0,
    "amount": 1000,
    "articles": [
      {
        "id": null,
        "amount": 1000
      },
      {
        "id": null,
        "amount": 100
      },
      {
        "id": null,
        "amount": 500
      },
      {
        "id": null,
        "amount": 100
      }
    ]
  },
  {
    "user_name": "admin-gatsby-local5",
    "user_first_name": "Admin",
    "user_last_name": "Gatsby",
    "userid": 5,
    "total_article": 0,
    "amount": 1000,
    "articles": [
      {
        "id": null,
        "amount": 1000
      },
      {
        "id": null,
        "amount": 100
      },
      {
        "id": null,
        "amount": 500
      },
      {
        "id": null,
        "amount": 100
      }
    ]
  },
  {
    "user_name": "admin-gatsby-local-6",
    "user_first_name": "Admin",
    "user_last_name": "Gatsby",
    "userid": 6,
    "total_article": 0,
    "amount": 1000,
    "articles": [
      {
        "id": null,
        "amount": 1000
      },
      {
        "id": null,
        "amount": 100
      },
      {
        "id": null,
        "amount": 500
      },
      {
        "id": null,
        "amount": 100
      }
    ]
  },
]

const PaymentList = () => {

  const { setLoader } = useLayout();
  const param = useParams();
  const [monthYear, setMonthYear] = useState<any>({});
  const [paymentData, setPaymentData] = useState<any>();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [confirmationInfo, setConfirmationInfo] = useState({});

  useEffect(() => {
    const { id } = param;
    if (id) {
      let a = id.split('-');
      setMonthYear({ month: a[0], year: a[1], fullMonth: moment(a[0], 'MM').format('MMMM') + ' ' + a[1] })
      getMonthWisePaypoffList({ month: a[0], year: a[1] });
    }
  }, [])

  const getMonthWisePaypoffList = async (date: any) => {
    setLoader(true);
    let payload = { month: date.month, year: date.year };
    const res = await getPayoffsByMonthApi({ payload });
    if (res && res.status === 200) {
      const a = res?.data.map((a: any) => ({ ...a, isSelected: false, isDisabled: a.amount < 1, date: payload }));
      // const a = listData.map((a: any) => ({ ...a, isSelected: false, isDisabled: a.amount < 1, date: payload }));
      setPaymentData(a);
      setLoader(false);
    }
  }

  const confirmationCallback = async (success: boolean, a: any) => {
    if (success) {
      let payload = generatePayload(a);
      await completePayment(payload);
      setConfirmationOpen(false);
    } else {
      setConfirmationOpen(!confirmationOpen);
    }
  }

  const generatePayload = (a: any) => {
    let userList = [];
    if (a.paymentData) {
      userList.push({
        id: a.paymentData.userid,
        amount: a.paymentData.amount,
        articles: a.paymentData.articles
      });
    } else {
      (paymentData || []).forEach((user: any) => {
        if (!user.isDisabled && user.isSelected) {
          userList.push({
            id: user.userid,
            amount: user.amount,
            articles: user.articles
          })
        }
      });
    }

    let payload = {
      "month": monthYear.month,
      "year": monthYear.year,
      "users": userList
    };
    console.log(payload, "payload");
    return payload
  }

  const completePayment = async (payload: any) => {
    setLoader(true);
    try {
      const response = await makePayoutApi({ payload }); // complepayment 'payout' API
      console.log(response, "response");
      if (response && response.status === 200) {
        getMonthWisePaypoffList(monthYear)
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  }

  const actionClick = (row: any, confirmation: boolean) => {
    if (confirmation) {
      toggleModal(row);
    }
  }

  const toggleModal = (row?: any) => {
    setConfirmationInfo({
      action: 'confirmation',
      message: 'Do you want to continue for payment?',
      paymentData: row
    });
    setConfirmationOpen(!confirmationOpen);
  }

  const onUserSelect = (row: any) => {
    let arr = paymentData.map((item: any) => {
      if (item.userid === row.userid) {
        return { ...item, isSelected: !item.isSelected }
      } else {
        return item
      }
    })
    let a = arr.every((item: any) => item.isSelected)
    setSelectAll(a);
    setPaymentData(arr);
  }

  const onSelectAll = (e: any) => {
    setSelectAll(e.target.checked);
    let arr = paymentData.map((item: any) => {
      return { ...item, isSelected: e.target.checked }
    })
    setPaymentData(arr);
  }

  const renderTablerow = () => {
    let arr: Array<ReactElement> = [];
    paymentData?.forEach((row: any, index: number) => {
      arr.push(<tr key={index + 1}>
        <td>
          <label className='form-check form-check-custom form-check-solid align-items-start'>
            <input
              className='form-check-input me-3'
              type='checkbox'
              disabled={row.isDisabled}
              checked={row.isSelected}
              onChange={() => { onUserSelect(row) }}
            />
          </label>
        </td>
        <td>
          <span className='fw-semibold d-block fs-7'>
            {index + 1}
          </span>
        </td>
        <td>
          <span className='fw-semibold d-block fs-7'>
            {row.user_name}
          </span>
        </td>
        <td>
          <span className='fw-semibold d-block fs-7'>
            {row.userid}
          </span>
        </td>
        <td>
          <span className='fw-semibold d-block fs-7'>
            {row.amount}
          </span>
        </td>
        <td className='text-center'>
          <button
            className='btn btn-secondary btn-sm px-4 me-2'
            onClick={() => { actionClick(row, true) }}
          >
            Complete
          </button>
        </td>
      </tr>)
    })

    return arr
  }

  return (
    <div>
      <ConfirmationModal
        open={confirmationOpen}
        confirmationInfo={confirmationInfo}
        onClose={() => { setConfirmationOpen(false) }}
        handleConfirmationMessage={confirmationCallback}
      />
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <div>
          <h1 className='fs-2hx fw-bold text-dark mb-0'>{monthYear?.fullMonth}</h1>
        </div>
        <button
          type='button'
          disabled={!(paymentData || []).some((i: any) => !i.isDisabled && i.isSelected)}
          className='btn btn-secondary'
          onClick={() => { toggleModal() }}
        >
          Complete Selected
        </button>
      </div>
      <div className='card'>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th>
                    <label className='form-check form-check-custom form-check-solid align-items-start'>
                      <input
                        className='form-check-input me-3'
                        type='checkbox'
                        name='selectAll'
                        checked={selectAll}
                        onChange={onSelectAll}
                      />
                    </label>
                  </th>
                  <th className='rounded-start'>No.</th>
                  <th>Username</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {renderTablerow()}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </div>
  )
}

export default PaymentList




