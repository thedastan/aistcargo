import { useEffect, useState } from 'react'

export function useFullHeight() {
	const [clientHeight, setHeight] = useState(832)
	useEffect(() => {
		setHeight(document.documentElement.clientHeight)
	}, [])

	return { clientHeight }
}
