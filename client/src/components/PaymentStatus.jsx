import React from 'react'
import '../containers/Admin Page/Admin.css'

function PaymentStatus({status}) {
  return (
    <> 
        {status == "Approved" && 
            <td className='approve'>
                Approve
            </td>
        }
        {status == "Cancel" && 
            <td className='cancel'>
                Cancel
            </td>
        }
        {status == "Pending" && 
            <td className='pending'>
                Pending
            </td>
        }
    </>
  )
}

export default PaymentStatus