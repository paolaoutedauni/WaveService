import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';
import { userRole } from 'src/helpers/constants';

@Entity()
export class User {
  constructor({
    firstName,
    lastName,
    userName,
    email,
    password,
    birthday,
    role,
    imagen,
  }: {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    password?: string;
    birthday?: Date;
    role?: userRole;
    imagen?: Blob;
  } = {}) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.userName = userName),
      (this.email = email),
      (this.password = password),
      (this.birthday = birthday),
      (this.role = role),
      (this.imagen = imagen);
  }

  @PrimaryColumn()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  birthday: Date;

  @Column()
  imagen: Blob;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole.NORMAL,
  })
  role: userRole;

  @OneToMany(
    type => Post,
    post => post.user,
  )
  posts: Post[];
}
