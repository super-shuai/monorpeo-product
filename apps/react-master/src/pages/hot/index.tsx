import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default () => {
  const countRedux = useSelector(state => state.counter.value)
  const [count, setCount] = useState(100)

  console.log('hollo')
  
  function addCount() {
    setCount(count + 1)
  }

  const countRef = useRef(count)

  useEffect(() => {
    countRef.current = count
  })

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount(countRef.current+1)
  //     countRef.current++
  //     console.log(count)
  //     console.log(countRef.current)
  //   }, 1000)
  //   return () => clearInterval(timer)
  // }, [])

  return (
    <>
      <p>count: {count}</p>
      <button onClick={addCount}>点我+1</button>
      <div>{countRedux}</div>
    </>
  )
}
