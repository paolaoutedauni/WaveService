import { Module, forwardRef } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { User } from 'entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/helpers/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        forwardRef(() => AuthModule), 
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
    }),
    ],
    controllers: [RegisterController],
    providers: [RegisterService],
    exports: [RegisterService],
  })
export class RegisterModule {}
