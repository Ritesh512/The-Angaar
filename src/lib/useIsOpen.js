import { useEffect, useState } from 'react'
import { brand } from '../data/restaurant'

const mins = ({ hour, minute }) => hour * 60 + minute

function compute() {
  const now = new Date()
  const cur = now.getHours() * 60 + now.getMinutes()
  return cur >= mins(brand.opensAt) && cur < mins(brand.closesAt)
}

export function useIsOpen() {
  const [open, setOpen] = useState(compute)
  useEffect(() => {
    const id = setInterval(() => setOpen(compute()), 30000)
    return () => clearInterval(id)
  }, [])
  return open
}
