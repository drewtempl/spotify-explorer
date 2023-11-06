export type SongItemListProps = {
    data: TrackData[]
}

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
  };
