
import { useMemo, useRef } from "react"

type noop = (this: any, ...args: any[]) => any

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>

export default function useMemoizedFn<T extends noop>(fn:T) {
  const fnRef = useRef<T>(fn)

  // setState 组件渲染 能够获取最新的fn函数
  fnRef.current = useMemo(() => fn, [fn])

  // 缓存引用地址
  const memoizedFn = useRef<PickFunction<T>>(null)

  if(!memoizedFn.current) {
    memoizedFn.current = function(this, ...args) {
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn.current as T

}