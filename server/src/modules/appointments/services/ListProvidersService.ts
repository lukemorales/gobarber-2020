import { injectable, inject } from 'tsyringe';

import BaseService from '@shared/services/Base';
import UserRepository from '@modules/users/repositories/UserRepository';

interface Request {
  user_id: string;
}

@injectable()
class ListProvidersService extends BaseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepository,
  ) {
    super();
  }

  public async execute(data?: Request) {
    const providers = await this.usersRepository.findAllProviders({
      excluded_user_id: data?.user_id,
    });

    return providers;
  }
}

export default ListProvidersService;
