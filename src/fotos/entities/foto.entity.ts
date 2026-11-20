import { Column, CreateDateColumn, Entity,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

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
}
