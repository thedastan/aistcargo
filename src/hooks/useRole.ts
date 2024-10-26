import { useAppSelector } from './useAppSelector'

export function useRole() {
	const { role } = useAppSelector(s => s.storage)
	return role
}
