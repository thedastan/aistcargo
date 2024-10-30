import { FaChevronDown } from 'react-icons/fa6'

import PackageCub from '@/assets/svg/PackageCub'

import { useParcelTypes } from '@/hooks/useLists'

import InputComponent from '../inputs/InputComponent'

import SearchSelect from './SearchSelect'

interface ParcelTypesComponentProps {
	onChange: (parcel: string) => void
	value: string
}

const ParcelTypesComponent = ({
	onChange,
	value
}: ParcelTypesComponentProps) => {
	const { data } = useParcelTypes()
	return !data ? null : (
		<SearchSelect
			data={data}
			onChange={onChange}
			value={value}
		>
			<InputComponent
				title='Тип посылки'
				placeholder='Тип посылки'
				value={data.find(el => el.id === +value)?.name || ''}
				isReadOnly={true}
				LeftElement={<PackageCub />}
				RightElement={
					<FaChevronDown
						color='#292D32'
						fontSize='14px'
					/>
				}
			/>
		</SearchSelect>
	)
}

export default ParcelTypesComponent
