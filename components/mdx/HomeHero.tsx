type Action = {
  href: string
  label: string
  kind?: 'primary' | 'secondary'
}

export function HomeHero({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string
  title: string
  description: string
  actions: Action[]
}) {
  return (
    <section className="home-hero">
      <div className="home-hero-glow" aria-hidden="true" />
      <p className="home-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="home-lead">{description}</p>
      <div className="home-actions">
        {actions.map((action) => (
          <a
            key={action.href}
            className={action.kind === 'secondary' ? 'home-button secondary' : 'home-button primary'}
            href={action.href}
          >
            {action.label}
          </a>
        ))}
      </div>
    </section>
  )
}
