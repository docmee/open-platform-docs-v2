type ReadingPath = {
  href: string
  title: string
  description: string
}

export function HomeReadingPaths({
  items,
  title = '推荐阅读',
  description = '按任务快速找到合适的阅读路径。'
}: {
  items: ReadingPath[]
  title?: string
  description?: string
}) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>{title}</h2>
        <p>{description}</p>
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
