import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	JoinColumn,
	Index,
} from 'typeorm'
import { ID } from '@/backend/types'
import { Album } from './album'
import { Media } from './media'

@Entity()
@Index(['album', 'media'], { unique: true })
export class AlbumMedia {
	@PrimaryColumn({ type: 'text' })
	id!: ID

	@Column({ type: 'text' })
	albumId!: string

	@Column({ type: 'text' })
	mediaId!: string

	@ManyToOne(() => Album, { onDelete: 'CASCADE' })
	@JoinColumn()
	album!: Album

	@ManyToOne(() => Media, { onDelete: 'CASCADE' })
	@JoinColumn()
	media!: Media
}
