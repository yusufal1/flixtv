import MainSection from '@/app/components/main-section'
import TopSection from '@/app/components/top-section'
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