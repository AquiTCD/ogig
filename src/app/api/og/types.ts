export type OGParams = {
  title: string;
  subtitle: string;
  date: string;
  // Optional mission-specific params
  ranking?: string;
  condition?: string;
  capacity?: string;
  metric?: string;
  owner?: string;
  game?: string;
  elimination?: string;
};

export type OGTemplate = (params: OGParams) => React.ReactElement;
