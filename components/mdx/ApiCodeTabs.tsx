'use client'

import { ComponentProps } from 'react'
import { Tabs } from 'nextra/components'

type ApiCodeTabsProps = ComponentProps<typeof Tabs>
export type ApiCodeTabProps = ComponentProps<typeof Tabs.Tab>

function ApiCodeTabs(props: ApiCodeTabsProps) {
  return <Tabs {...props} />
}

export function ApiCodeTab(props: ApiCodeTabProps) {
  return <Tabs.Tab {...props} />
}

export default ApiCodeTabs
