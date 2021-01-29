declare namespace UserFormModuleCssNamespace {
  export interface IUserFormModuleCss {
    container: string;
    row: string;
  }
}

declare const UserFormModuleCssModule: UserFormModuleCssNamespace.IUserFormModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UserFormModuleCssNamespace.IUserFormModuleCss;
};

export = UserFormModuleCssModule;
