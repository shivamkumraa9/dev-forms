export default function FormPageLayout(props) {
  const { heading, children } = props;
  return (
    <section className="container">
      <div className="row justify-content-center">
        <div className="card m-auto shadow p-3 mb-5 bg-white rounded col-lg-4 col-md-8 col-sm-11">
          <div className="card-body">
            <h1 className="mb-3 text-center">{heading}</h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
