type FlowStep = {
  title: string
  description: string
}

export function HomeFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <section className="home-section">
      <div className="home-section-heading">
        <h2>接入流程</h2>
        <p>按顺序完成平台接入和联调。</p>
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
