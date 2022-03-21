import React, { useEffect, useState } from 'react'
import { Row, Container } from 'react-bootstrap'
import AdminNavBar from '../../components/AdminNavBar'
import PaymentStatus from '../../components/PaymentStatus'
import TableActionDD from '../../components/TableActionDD'
import UserStatus from '../../components/UserStatus'
import './Admin.css'
import {API} from "../../config/api"

function Dashboard() {

  const [transaction, setTransaction] = useState([])

  const getTrans = async () => {
    try {
      
      const response = await API.get('/transaction')
      setTransaction(response.data.data.transaction)
      console.log(transaction)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrans()
  }, [])

  return (
    <>    
        <AdminNavBar />
        <Container fluid style={{ backgroundColor:"#e5e5e5", height:"700px", marginTop:"-10px" }}>
          <Row>
            <div className="dashboard-title">
              <h3>Incoming Transaction</h3>
            </div>                
          </Row>
          <Row className="col-10 table-section"> 
            <table className="table-info" style={{ marginLeft: "150px" }}>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Users</th>
                    <th>Bukti Transfer</th>
                    <th>Remaining Active</th>
                    <th>Status User </th>
                    <th>Status Payment</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {transaction?.map((item, index) => (
                    <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.user.fullname}</td>
                    <td>{item.transferProof}</td>
                    <td>{item.remainingActive} / Hari</td>
                    <UserStatus status={item.userStatus} />
                    <PaymentStatus status={item.paymentStatus} />                    
                    <TableActionDD index={item.id} />
                    </tr>                
                  ))}                   
                </tbody>
                </table>
          </Row>
        </Container>
        
    </>
  )
}

export default Dashboard