import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

export enum Gender {
    MALE = 'M',
    FEMALE = 'F',
    OTHER = 'O',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({
        nullable: true
    })
    middleName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'varchar',
        enum: Gender,
    })
    gender: Gender;

    @Column({
        unique: true
    })
    phone: number;
}
