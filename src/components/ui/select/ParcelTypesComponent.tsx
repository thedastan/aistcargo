import { FaChevronDown } from 'react-icons/fa6'

import PackageCub from '@/assets/svg/PackageCub'

import { useParcelTypes } from '@/hooks/useLists'

import InputComponent from '../inputs/InputComponent'

import SearchSelect from './SearchSelect'
import { PartialListItem } from '@/models/transport.model'

interface ParcelTypesComponentProps {
	onChange: (parcel: PartialListItem) => void
	parcel: PartialListItem
}

const ParcelTypesComponent = ({
	onChange,
	parcel
}: ParcelTypesComponentProps) => {
	const { data } = useParcelTypes()
	return !data ? null : (
		<SearchSelect
			data={data}
			onChange={onChange}
			value={parcel}
		>
			<InputComponent
				title='Тип посылки'
				placeholder='Тип посылки'
				value={parcel.name || ''}
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
