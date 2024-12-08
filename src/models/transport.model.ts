import { StaticImageData } from 'next/image'

import Airplane from '@/assets/img/Airplane.svg'
import CarTransport from '@/assets/img/CarTransport.svg'
import TruckTransport from '@/assets/img/TruckTransport.svg'
import AirplaneSvg from '@/assets/svg/AirplaneSvg'
import CarSvg from '@/assets/svg/CarSvg'
import TruckSvg from '@/assets/svg/TruckSvg'

export interface IListItem {
	id: number
	name: string
}

export type PartialListItem = Partial<IListItem>

export enum EnumTransportId {
	AIRPLANE = 1,
	CAR = 2,
	TRUCK = 3
}

export interface ITransportType {
	id: number
	image: StaticImageData
	icon: () => JSX.Element
	name: string
}

export const transports: ITransportType[] = [
	{
		id: EnumTransportId.AIRPLANE,
		image: Airplane,
		icon: AirplaneSvg,
		name: 'Самолёт'
	},
	{
		id: EnumTransportId.CAR,
		image: CarTransport,
		icon: CarSvg,
		name: 'Автомобиль'
	},
	
	{
		id: EnumTransportId.TRUCK,
		image: TruckTransport,
		icon: TruckSvg,
		name: 'Грузовик'
	}
]
