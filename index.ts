import { useCallback, useState } from 'react'

interface Lock<T> {
  locked: boolean
  run: (runner: () => Promise<T>) => Promise<T>
}

interface LockOptions {
}

function useLock<T>({}: LockOptions): Lock<T> {
  const [runningPromise, setRunningPromise] = useState<Promise<T> | null>(null)

  const run = useCallback<(runner: () => Promise<T>) => Promise<T>>(async (runner: () => Promise<T>) => {
    if (runningPromise != null) return runningPromise

    const running = runner().then((res) => {
      setRunningPromise(null)
      return res
    })
    setRunningPromise(running)

    return running
  }, [runningPromise])

  return {
    locked: runningPromise != null,
    run,
  }
}

export default useLock
