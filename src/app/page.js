import MainSection from '@/components/main-section'
import TopSection from '@/components/top-section'
import React from 'react'
import { TabsProvider } from './Context/TabsContext'

const Page = () => {
  return (
    <TabsProvider>
      <div>
        <TopSection/>
        <MainSection/>
      </div>
    </TabsProvider>
  )
}

export default Page