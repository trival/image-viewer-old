import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm'
import { ID } from '@/backend/types'
import { Library } from './library'
import { AlbumMedia } from './albumMedia'

@Entity()
export class Media {
	@PrimaryColumn({ type: 'text' })
	id!: ID

	@Column({ type: 'text' })
	libraryId!: string

	@ManyToOne(() => Library, { cascade: false, onDelete: 'CASCADE' })
	@JoinColumn()
	library!: Library

	@Column({ type: 'text' })
	type!: string

	@Column({ type: 'text' })
	directory!: string

	@Column({ type: 'text' })
	fullPath!: string

	@Column({ type: 'text', nullable: true })
	thumbPath!: string

	@OneToMany(() => AlbumMedia, (a) => a.album)
	albums!: AlbumMedia[]

	// file meta data

	@Column({ type: 'text', nullable: true })
	fileName!: string

	@Column({ type: 'int', nullable: true })
	fileSize!: number

	@Column({ type: 'int', nullable: true })
	fileCreatedAt!: number

	@Column({ type: 'int', nullable: true })
	fileUpdatedAt!: number

	// media meta data

	@Column({ type: 'int', nullable: true })
	metaDate!: number

	@Column({ type: 'int', nullable: true })
	metaWidth!: number

	@Column({ type: 'int', nullable: true })
	metaHeight!: number

	@Column({ type: 'int', nullable: true })
	metaLength!: number
}
