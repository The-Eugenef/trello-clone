import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    try {
      // Верификация токена и получение полезной нагрузки
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findOne(payload.sub);

      // Проверка существования пользователя и соответствия токена
      if (!user || user.token !== token) {
        throw new ForbiddenException('Access denied');
      }

      // Добавление пользователя к запросу
      request.user = user;
    } catch {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader) {
      const [type, token] = authorizationHeader.split(' ');
      return type === 'Bearer' ? token : null;
    }
    return null;
  }
}
