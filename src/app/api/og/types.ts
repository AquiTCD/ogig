export type OGParams = {
  title: string;
  subtitle: string;
  date: string;
};

export type OGTemplate = (params: OGParams) => React.ReactElement;
