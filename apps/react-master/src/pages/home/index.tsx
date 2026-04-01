import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { incremented } from '@/store/reducers/counterSlice'
import { Outlet, useNavigate } from 'react-router-dom'
import { add } from "@monorpeo/lib"

export default function Home() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const history = useNavigate()
  console.log(count)
  const [state, setState] = useState(1)

  function handleClick() {
    setState(state+1)
    console.log('init',state)
    setTimeout(() => {
      setState(state+1)
      setState(state+1)
      console.log('time',state)
    }, 0)
  }

  function handleReduxClick() {
    dispatch(incremented())
  }

  const isMounted = useRef(false)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])
  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true
    } else {
      console.log('更新执行')
    }
    return () => {
      isMounted.current = false
    }
  }, [state])

  function toHot() {
    history('/hot')
  }
  return (
    <div>
      <span onClick={handleClick}>点我</span>
      <div>{state}</div>
      <div>redux-{count}</div>
      <button onClick={handleReduxClick}>redux点击</button>
      <div onClick={toHot}>去hot页面</div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}