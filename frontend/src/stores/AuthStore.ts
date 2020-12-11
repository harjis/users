class Store {
  private accessToken: string | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  secureGetAccessToken(): string {
    const token = this.accessToken;
    if (token === null) {
      throw new Error("Access token has not been set!");
    }
    return token;
  }
}

export const AuthStore = new Store();
