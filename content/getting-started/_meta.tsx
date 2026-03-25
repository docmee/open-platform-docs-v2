import { CodeXmlIcon, NotebookIcon, RocketIcon } from 'lucide-react'
import { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: {
    title: (
      <span className="inline-flex items-center gap-1">
        <RocketIcon className="size-3" />
        快速开始
      </span>
    ),
  },
  'template-mode': {
    title: (
      <span className="inline-flex items-center gap-1">
        <NotebookIcon className="size-3" />
        模板模式
      </span>
    ),
  },

  'ail-ppt': {
    title: (
      <span className="inline-flex items-center gap-1">
        <CodeXmlIcon className="size-3" /> AI 智能布局
      </span>
    ),
  },
}

export default meta
