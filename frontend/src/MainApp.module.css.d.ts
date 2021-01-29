declare namespace MainAppModuleCssNamespace {
  export interface IMainAppModuleCss {
    container: string;
  }
}

declare const MainAppModuleCssModule: MainAppModuleCssNamespace.IMainAppModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainAppModuleCssNamespace.IMainAppModuleCss;
};

export = MainAppModuleCssModule;
