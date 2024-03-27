import Image from 'next/image'
import React from 'react'

interface Props {
    width: number
    height: number
    alt: string
}

function Logo({ width, height, alt}: Props) {
  return (
    <Image src={'/logo.svg'} width={width} height={height} alt={alt}/>
  )
}

export default Logo