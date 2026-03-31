import { ReactNode } from 'react'

type ImportantNoteProps = {
  title?: string
  children: ReactNode
}

export function ImportantNote({ title = '重要信息', children }: ImportantNoteProps) {
  return (
    <div className="api-important-note">
      <p className="api-important-note-title">{title}</p>
      <div className="api-important-note-body">{children}</div>
    </div>
  )
}

export default ImportantNote
