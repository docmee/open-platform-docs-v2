type CardItem = {
  href: string
  title: string
  description: string
  badge: string
}

export function HomeCardGrid({ items }: { items: CardItem[] }) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>核心入口</h2>
        <p>从最常用的路径进入文档。</p>
      </div>
      <div className="home-card-grid">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="home-card">
            <span className="home-card-badge">{item.badge}</span>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
