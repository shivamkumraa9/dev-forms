export function Loader(props) {
  const { color } = props;
  return (
    <div className="spinner-border" style={{ width: '3rem', height: '3rem', color: color || '#2487ce' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export function SectionLoader() {
  return (
    <section className="text-center">
      <Loader />
    </section>
  );
}
