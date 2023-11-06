export type SongItemListProps = {
    data: TrackData[]
}

export type TrackData = {
    album: {
        images: [
            {
                url: string
            },
        ]
    },
    name: string,
    artists: [
        {
            name: string,
        }
    ],
    popularity: number,
    preview_url: string,
}
