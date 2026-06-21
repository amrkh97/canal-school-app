export default function SectionTitle({ children }) {
  return (
    <div className="section-title" data-reveal>
      <h2>{children}</h2>
      <div className="line" />
    </div>
  );
}
