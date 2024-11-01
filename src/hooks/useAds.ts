import { useQuery } from '@tanstack/react-query'

import { adService } from '@/services/ad.service'

export function useFIlterAds() {
	const { data, isLoading } = useQuery({
		queryKey: ['all-ads'],
		queryFn: () => adService.getFilterAds()
	})

	return { data, isLoading }
}
