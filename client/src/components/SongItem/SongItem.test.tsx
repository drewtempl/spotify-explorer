import React from "react";
import { render, screen } from "@testing-library/react";
import { SongItem } from "./SongItem";
import { SongData } from "./SongItem.types";

const mockName = 'test-name';
const mockArtist = 'test-artist';

const mockSongData: SongData = {
    album: {
        images: [
            {
                url: 'test-url',
            },
        ]
    },
    name: mockName,
    artists: [
        {
            name: mockArtist,
        }
    ],
    popularity: 50,
}

describe("SongItem test suite", () => {
  test("renders correctly", () => {
    render(<SongItem data={mockSongData} index={0}></SongItem>);

    expect(screen.getByText(mockName)).toBeInTheDocument();
    expect(screen.getByText(mockArtist)).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
