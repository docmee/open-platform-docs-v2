type HttpMethodBadgeProps = {
  method: string
}

export function HttpMethodBadge({ method }: HttpMethodBadgeProps) {
  const normalized = method.toLowerCase()

  return (
    <span className={`api-method api-method-${normalized}`}>
      {method.toUpperCase()}
    </span>
  )
}

export default HttpMethodBadge
