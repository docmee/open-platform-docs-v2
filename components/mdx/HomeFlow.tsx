type FlowStep = {
  title: string
  description: string
}

export function HomeFlow({
  steps,
  title = '接入流程',
  description = '按顺序完成平台接入和联调。'
}: {
  steps: FlowStep[]
  title?: string
  description?: string
}) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="home-flow">
        {steps.map((step, index) => (
          <div key={step.title} className="home-flow-step">
            <span className="home-flow-index">{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
