declare namespace UsersModuleCssNamespace {
  export interface IUsersModuleCss {
    container: string;
  }
}

declare const UsersModuleCssModule: UsersModuleCssNamespace.IUsersModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UsersModuleCssNamespace.IUsersModuleCss;
};

export = UsersModuleCssModule;
