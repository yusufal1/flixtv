import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = ({ cards }) => {
  return (
    Array(cards).fill(0).map((_, i) => <div key={i}>
        <Skeleton count={5} width={343} height={193} borderRadius={16} className='mt-14'/>
</div>)
    
  )
}

export default CardSkeleton