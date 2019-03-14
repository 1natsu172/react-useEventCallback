import { useRef, useCallback, useEffect, useLayoutEffect } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @description For reference state value on event handler.
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 * @see https://github.com/facebook/react/issues/14099
 * @todo `unknown` type loos better than `any`. But can't use unknown……Error message "Type 'unknown' is not assignable to type ~" why??
 */
const useEventCallbackBase = <T extends (...args: any[]) => unknown>(
  useEffectHook: typeof useEffect | typeof useLayoutEffect,
  fn: T,
  deps: ReadonlyArray<unknown>
) => {
  const ref = useRef<T>(fn)

  useEffectHook(() => {
    ref.current = fn
  }, [fn, ...deps])

  return useCallback(
    (...args: any[]) => {
      const callback = ref.current
      callback(...args)
    },
    [ref]
  )
}

export const useEventCallback = useEventCallbackBase.bind(null, useLayoutEffect)

export const useEventCallbackWithUseEffect = useEventCallbackBase.bind(
  null,
  useEffect
)
