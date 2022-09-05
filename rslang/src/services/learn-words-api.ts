import RequestError, { AuthorisationError } from '../types/errors/RequestError';
import IRequestFunctionOptions from '../types/services-interfaces/IRequestFunction';
import IStatistics from '../types/services-interfaces/IStatistics';
import IUser from '../types/services-interfaces/IUser';
import IUserToken from '../types/services-interfaces/IUserToken';
import IUserWord from '../types/services-interfaces/IUserWord';
import IWord from '../types/services-interfaces/IWord';

class LearnWordsApi {
  private root: string;
  private token: string;
  private refreshToken: string;
  private wordsPath: string;
  private usersPath: string;

  constructor() {
    this.root = 'https://rslangappteam102.herokuapp.com';
    this.token = localStorage.getItem('token') || '';
    this.refreshToken = localStorage.getItem('refreshToken') || '';
    this.wordsPath = this.root + '/words';
    this.usersPath = this.root + '/users';
  }

  private setUsersData(name: string, id: string): void {
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
  }

  private setTokensValue(token: string, refreshToken: string): void {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    this.token = token;
    this.refreshToken = refreshToken;
  }

  private async updateTokensValue(): Promise<void> {
    const userId = localStorage.getItem('id') || '';
    const response = await this.getNewUserTokens(userId);
    const newToken = response ? response.token : '';
    const newRefreshToken = response ? response.refreshToken : '';

    this.setTokensValue(newToken, newRefreshToken);
  }

  private async createRequest<T>(url: string, options?: IRequestFunctionOptions): Promise<T | void> {
    const errorStatuses = [400, 401, 403, 404, 417, 422];

    try {
      const response = options
        ? await fetch(url, { ...options })
        : await fetch(url);

      if (response && errorStatuses.includes(response.status)) {
        throw new RequestError(`${response.status}`);
      }

      if (response.status === 204) return;

      const data = await response.json() as T;

      return data;
    } catch (error) {
      if (!(error instanceof Error)) return;
      if (!(error instanceof RequestError)) throw new Error(error.message);

      if (error.message === '403') throw new Error(error.message);

      if (error.message === '422') {
        console.warn('Incorrect e-mail or password.');
      };

      if (error.message === '400') {
        console.warn('Bad request.');
      };

      if (error.message === '417' || error.message === '404') {
        if (url.includes('words') && error.message === '417') {
          console.warn('A word with the same name already exists.')
          return;
        }

        throw new Error(error.message);
      };

      if (error.message === '401') {
        console.warn('Access token is missing or invalid.');
        await this.updateTokensValue();

        if (options && !options.headers) return;

        const newOptions = { ...options };
        const newAuthorizationHeader = { 'Authorization': `Bearer ${this.token}` };
        newOptions.headers = { ...newOptions.headers, ...newAuthorizationHeader };

        await this.createRequest(url, newOptions);
      };
    }
  }

  public async getWords(group = 0, page = 0): Promise<IWord[] | void> {
    const queryURL = `${this.wordsPath}?page=${page}&group=${group}`;
    return await this.createRequest(queryURL);
  }

  public async getWord(wordId: string): Promise<IWord | void> {
    const queryURL = `${this.wordsPath}/${wordId}`;
    return await this.createRequest(queryURL);
  }

  public async createUser(body: Pick<IUser, 'name' | 'email' | 'password'>): Promise<void> {
    const stringifiedBody = JSON.stringify(body);

    const response = await this.createRequest(this.usersPath, {
      method: 'POST',
      body: `${stringifiedBody}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }) as Pick<IUser, 'name' | 'email' | 'id'> | void;

    if (!response) return;

    const name = response.name;
    const id = response.id;

    this.setUsersData(name, id);
  }

  public async getUser(id: string): Promise<Pick<IUser, 'name' | 'email' | 'id'> | void> {
    const queryURL = `${this.usersPath}/${id}`;

    return await this.createRequest(queryURL, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      }
    });
  }

  private async getNewUserTokens(id: string): Promise<IUserToken | void> {
    try {
      const queryURL = `${this.usersPath}/${id}/tokens`;

      const response = await fetch(queryURL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.refreshToken}`,
        },
      });

      if (response.status === 401) throw new AuthorisationError('Refresh token expired.');
      console.dir(response)

      return await response.json();
    } catch (error) {
      console.dir(error)
      if (!(error instanceof Error)) return;
      throw error;
    }
  }

  public async getUserWords(id: string): Promise<IUserWord[] | void> {
    const queryURL = `${this.usersPath}/${id}/words`;
    return await this.createRequest(queryURL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  public async createUserWord(id: string, wordId: string, body: IUserWord)
    : Promise<IUserWord | void> {
    const queryURL = `${this.usersPath}/${id}/words/${wordId}`;
    const stringifiedBody = JSON.stringify(body);

    return await this.createRequest(queryURL, {
      method: 'POST',
      body: `${stringifiedBody}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  public async getUserWord(id: string, wordId: string): Promise<IUserWord | void> {
    const queryURL = `${this.usersPath}/${id}/words/${wordId}`;
    return await this.createRequest(queryURL, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  public async updateUserWord(id: string, wordId: string, body: IUserWord)
    : Promise<IUserWord | void> {
    const queryURL = `${this.usersPath}/${id}/words/${wordId}`;
    const stringifiedBody = JSON.stringify(body);

    return await this.createRequest(queryURL, {
      method: 'PUT',
      body: `${stringifiedBody}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  public async signIn(body: Pick<IUser, 'email' | 'password'>): Promise<void> {
    const queryURL = `${this.root}/signin`;
    const stringifiedBody = JSON.stringify(body);
    const response = await this.createRequest(queryURL, {
      method: 'POST',
      body: `${stringifiedBody}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }) as IUserToken | void;

    if (!response) return;

    const token = response.token;
    const refreshToken = response.refreshToken;
    const name = response.name;
    const id = response.userId;

    this.setUsersData(name, id);
    this.setTokensValue(token, refreshToken);
  }

  public async getStatistics(id: string): Promise<IStatistics | void> {
    const queryURL = `${this.usersPath}/${id}/statistics`;
    return await this.createRequest(queryURL, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  public async updateStatistics(id: string, body: IStatistics): Promise<IStatistics | void> {
    const queryURL = `${this.usersPath}/${id}/statistics`;
    const stringifiedBody = JSON.stringify(body);
    return await this.createRequest(queryURL, {
      method: 'PUT',
      body: `${stringifiedBody}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }
}

export default LearnWordsApi;
