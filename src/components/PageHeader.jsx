export default function PageHeader({ title, subtitle, badge }) {
  return (
    <header className="page-header">
      <div className="page-header-row">
        <h1>{title}</h1>
        {badge && <span className="page-badge">{badge}</span>}
      </div>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
