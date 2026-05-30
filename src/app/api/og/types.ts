export type OGParams = {
  title: string;
  subtitle: string;
  date: string;
  // Optional mission-specific params
  status?: string;
  ranking?: string;
  condition?: string;
  participants?: string;
  metric?: string;
  creator?: string;
};

export type OGTemplate = (params: OGParams) => React.ReactElement;
