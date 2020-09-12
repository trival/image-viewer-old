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
import { Maybe } from '@/lib/types'

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
	thumbPath: Maybe<string>

	@OneToMany(() => AlbumMedia, (a) => a.media)
	albums!: AlbumMedia[]

	// file meta data

	@Column({ type: 'text', nullable: true })
	fileName: Maybe<string>

	@Column({ type: 'int', nullable: true })
	fileSize: Maybe<number>

	@Column({ type: 'int', nullable: true })
	fileCreatedAt: Maybe<number>

	@Column({ type: 'int', nullable: true })
	fileUpdatedAt: Maybe<number>

	// media meta data

	@Column({ type: 'int', nullable: true })
	metaDate: Maybe<number>

	@Column({ type: 'int', nullable: true })
	metaWidth: Maybe<number>

	@Column({ type: 'int', nullable: true })
	metaHeight: Maybe<number>

	@Column({ type: 'int', nullable: true })
	metaLength: Maybe<number>
}
