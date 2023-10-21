import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const TopCardSkeleton = ({ cards }) => {
  return (
    Array(cards).fill(0).map((_, i) => <div key={i}>
        <Skeleton count={1} width={452} height={679} borderRadius={16} className='mt-14'/>
</div>)
    
  )
}

export default TopCardSkeleton