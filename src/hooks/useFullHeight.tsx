import { useEffect, useState } from 'react'

export function useFullHeight() {
	const [clientHeight, setHeight] = useState(932)
	useEffect(() => {
		setHeight(document.documentElement.clientHeight)
	}, [])

	return { clientHeight }
}
