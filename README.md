# react-useEventCallback
escape hatch for event handler in React hooks.

## Motivation

want to refer to the value of state in the event handler.

Related: facebook/react#14099


## Escape hatch

cf. https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback

but……i wanted.

## API

Export two ways to use useEffect instead of useLayoutEffect for those who need it.

```javascript
import {useState} from 'react'
import {useEventCallback, useEventCallbackWithUseEffect} from './your-directories/useEventCallback'

const app = ()=> {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(prev => prev + 1)
  }
  
  const fooHandler = useEventCallback(()=> {
    console.log('current count:', count)
  }, [])
  
  return (
    <div onClick={increment}>Increment</div>
    <div onClick={fooHandler}>Click</div>
  )
}
```

