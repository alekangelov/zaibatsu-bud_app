export enum AboutReducerActionTypes {
  VERSION = "@ZAI/VERSION",
}

export type AboutActionTypes = {
  type: AboutReducerActionTypes.VERSION;
  payload: {
    version: string;
  };
};
