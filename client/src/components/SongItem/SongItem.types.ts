export type SongItemProps = {
    data: SongData,
    index: number,
}

export type SongData = {
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
}