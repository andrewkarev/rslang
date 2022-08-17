class LearnWordApi {
  root: string;
  token: string;

  constructor() {
    this.root = '<url можно взять из env variables например>';
    this.token = localStorage.get('token')
  }

  async getUser(id: string) {
  }
}

export default LearnWordApi;
