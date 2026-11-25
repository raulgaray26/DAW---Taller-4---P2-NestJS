import { Column, CreateDateColumn, Entity,
    PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany,
    ManyToOne, JoinTable,
} from 'typeorm';
import { Album } from '../../albumes/entities/album.entity.js';
import { Etiqueta } from './etiqueta.entity.js';

@Entity('fotos')
export class Foto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string | null;

    @Column({ type: 'text', nullable: true })
    fotografo: string | null;

    @Column({ type: 'real', default: 0 })
    calificacion: number;

    @Column()
    ruta: string;

    @CreateDateColumn()
    creadoEn: Date;

    @UpdateDateColumn()
    actualizadoEn: Date;

    @ManyToOne(() => Album, (album) => album.fotos, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    album: Album | null;

    @ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.fotos)
    @JoinTable({
        name: 'fotos_equipadas',
        joinColumn: { name: 'foto_id' },
        inverseJoinColumn: { name: 'etiqueta_id' },
    })
    etiquetas: Etiqueta[];
}
