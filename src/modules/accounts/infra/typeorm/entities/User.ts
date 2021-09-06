import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  is_admin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    switch (process.env.STORAGE_DRIVER) {
      case 'local':
        return `${process.env.API_URL}/avatars/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatars/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
