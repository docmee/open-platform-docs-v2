import { AppWindowMacIcon, CodeIcon, DollarSignIcon, PackageIcon, RocketIcon } from 'lucide-react'
import { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  index: {
    title: '开始',
    display: 'hidden',
  },
  'ui-integration': {
    title: (
      <span className="inline-flex items-center gap-2">
        <AppWindowMacIcon className="size-4" />
        UI 接入
      </span>
    ),
    type: 'page',
  },
  'getting-started': {
    title: (
      <span className="inline-flex items-center gap-2">
        <RocketIcon className="size-4" />
        快速开始
      </span>
    ),
    type: 'page',
  },
  'api-reference': {
    title: (
      <span className="inline-flex items-center gap-2">
        <CodeIcon className="size-4" />
        API 参考
      </span>
    ),
    type: 'page',
  },
  'open-capabilities': {
    title: (
      <span className="inline-flex items-center gap-2">
        <PackageIcon className="size-4" />
        开放能力
      </span>
    ),
    type: 'page',
  },

  pricing: {
    title: (
      <span className="inline-flex items-center gap-2">
        <DollarSignIcon className="size-4" />
        定价
      </span>
    ),
    type: 'page',
  },
}

export default meta
