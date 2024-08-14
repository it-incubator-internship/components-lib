import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { Root, List, Trigger, Content } from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabs.module.scss'

type TabType = {
  title: string
  value: string
  disabled?: boolean
}

type TabsProps = {
  tabs: TabType[]
  fullWidth?: boolean
} & ComponentPropsWithoutRef<typeof Root>

export const Tabs: FC<TabsProps> = ({
  tabs,
  children,
  fullWidth,
  className,
  ...rest
}) => {
  const classNames = {
    root: clsx(s.root, className),
    list: clsx(s.list),
    trigger: clsx(s.trigger, fullWidth && s.fullWidth),
  }

  return (
    <Root className={classNames.root} {...rest}>
      <List className={classNames.list}>
        {tabs.map(tab => (
          <Trigger
            className={classNames.trigger}
            disabled={tab.disabled}
            key={tab.value}
            value={tab.value}
          >
            {tab.title}
          </Trigger>
        ))}
      </List>
      {children}
    </Root>
  )
}

type TabContentProps = {
  value: string
  children: ReactNode
}

export const TabContent: FC<TabContentProps> = ({ children, value }) => {
  return (
    <Content className={s.content} value={value}>
      {children}
    </Content>
  )
}
