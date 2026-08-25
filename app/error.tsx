'use client'

import { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({ error, reset }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Something went wrong!</h2>
            <button
                disabled={isPending}
                onClick={() => {
                    startTransition(() => {
                        // Refresh the current route to clear server-side cache
                        router.refresh()
                        // Attempt to recover by re-rendering the segment
                        reset()
                    })
                }}
            >
                {isPending ? 'Resetting...' : 'Reset'}
            </button>
        </div>
    )
}