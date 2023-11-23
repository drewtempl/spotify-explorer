export type SongItemListProps = {
  data: TrackData[];
  isLoading?: boolean;
  url?: string | undefined;
  clickHandler?: () => void;
};

export type TrackData = {
  album: {
    images: [{ height: number; url: string }];
    name: string;
  };
  artists: [{ name: string }];
  name: string;
  popularity: number;
  preview_url: string;
  uri: string;
  id: string;
};
