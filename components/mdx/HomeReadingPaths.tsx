type ReadingPath = {
  href: string
  title: string
  description: string
}

export function HomeReadingPaths({ items }: { items: ReadingPath[] }) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>推荐阅读</h2>
        <p>按任务快速找到合适的阅读路径。</p>
      </div>
      <div className="home-reading-paths">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="home-reading-card">
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
