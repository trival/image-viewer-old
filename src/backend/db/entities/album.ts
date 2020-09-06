import { Entity, Column, PrimaryColumn } from 'typeorm'
import { ID } from '@/backend/types'

@Entity()
export class Album {
	@PrimaryColumn({ type: 'text' })
	id!: ID

	@Column({ type: 'text', nullable: true })
	name!: string

	@Column({ type: 'text', nullable: true })
	color!: string
}
