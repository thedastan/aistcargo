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

export enum EnumTransportId {
	CAR = 1,
	AIRPLANE = 2,
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
		id: EnumTransportId.CAR,
		image: CarTransport,
		icon: CarSvg,
		name: 'Машина'
	},
	{
		id: EnumTransportId.AIRPLANE,
		image: Airplane,
		icon: AirplaneSvg,
		name: 'Самолёт'
	},
	{
		id: EnumTransportId.TRUCK,
		image: TruckTransport,
		icon: TruckSvg,
		name: 'Грузовик'
	}
]
