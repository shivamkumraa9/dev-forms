export default function SettingsCard({ children }) {
  return (
    <div className="card m-auto p-3 mb-5 bg-white rounded col-lg-4 col-md-8 col-sm-12">
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
