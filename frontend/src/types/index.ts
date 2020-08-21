export enum LoadingState {
  NOT_LOADED,
  LOADING,
  LOADED,
}

export type Errors = {
  [key: string]: string[];
};

export type FormattedErrors = {
  [key: string]: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: Errors;
};
