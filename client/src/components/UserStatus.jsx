import React from 'react'

function UserStatus({status}) {
  return (
    <>
        {status == "Active" ? 
            <td className='active'>
                Active
            </td>
            :
            <td className='nactive'>
                Not Active
            </td>
        }
    </>
  )
}

export default UserStatus