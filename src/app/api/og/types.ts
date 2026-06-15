export type OGParams = {
  title: string;
  description: string;
  date: string;
  // Optional mission-specific params
  ranking?: string;
  condition?: string;
  capacity?: string;
  metric?: string;
  owner?: string;
  game?: string;
  elimination?: string;
  comment?: string;
  training?: string;
  // af-specific params
  wpm?: string;
  acc?: string;
  azik?: string;
  rank?: string;
  // Runtime origin for image URLs
  imageBaseUrl?: string;
};

export type OGTemplate = (params: OGParams) => React.ReactElement;
