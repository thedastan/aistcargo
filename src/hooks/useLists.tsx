import { useQuery } from '@tanstack/react-query'

import { otherService } from '@/services/other-lists.service'

export function useCity() {
	const { data, isLoading } = useQuery({
		queryKey: ['city'],
		queryFn: () => otherService.getCity()
	})

	return { data, isLoading }
}

export function useTransportTypes() {
	const { data, isLoading } = useQuery({
		queryKey: ['transport-type'],
		queryFn: () => otherService.getTransportTypes()
	})

	return { data, isLoading }
}

export function useParcelTypes() {
	const { data, isLoading } = useQuery({
		queryKey: ['parcel-type'],
		queryFn: () => otherService.getParcelTypes()
	})

	return { data, isLoading }
}
