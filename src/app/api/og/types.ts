export type OGParams = {
  title: string;
  description: string;
  date: string;
  // mission-card params
  ranking?: string;
  condition?: string;
  capacity?: string;
  metric?: string;
  owner?: string;
  game?: string;
  elimination?: string;
  // af params
  wpm?: string;
  acc?: string;
  azik?: string;
  rank?: string;
  comment?: string;
  training?: string;
  // Runtime origin for image URLs
  imageBaseUrl?: string;
};

export type OGTemplate = (params: OGParams) => React.ReactElement;
