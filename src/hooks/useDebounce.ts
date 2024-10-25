import { useEffect, useState } from 'react'

export const useDebounce = (value: string, ms = 400): string => {
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => setDebounced(value), ms)
		return () => clearInterval(handler)
	}, [value, ms])

	return debounced.toLowerCase()
}
