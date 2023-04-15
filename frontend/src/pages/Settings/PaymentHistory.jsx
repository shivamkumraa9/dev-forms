function PaymentTableRow({ item, index }) {
  return (
    <tr key={item.date}>
      <th scope="row">{index + 1}</th>
      <td>{item.plan}</td>
      <td>
        ₹
        {item.amount}
      </td>
      <td>{item.status}</td>
      <td>{(new Date(item.createdAt)).toLocaleDateString()}</td>
    </tr>
  );
}

export default function PaymentHistory({ paymentHistory }) {
  const rows = paymentHistory.map((item, index) => (
    <PaymentTableRow item={item} index={index} key={item._id} />
  ));

  return (
    <>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit" className="ms-2 btn btn-success btn-sm">View History</button>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Payment History</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">#</th>
                    <th scope="col">Plan Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  { rows }
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
