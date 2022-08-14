import { Entity, Column, PrimaryColumn } from 'typeorm'
import { ID } from '@/backend/types'

@Entity()
export class Library {
	@PrimaryColumn({ type: 'text' })
	id!: ID

	@Column({ type: 'text', nullable: true })
	name!: string

	@Column({ type: 'text', nullable: true })
	rootPath!: string

	@Column({ type: 'text', nullable: true })
	ignorePaths!: string
}
