import { ObjectId } from "mongodb";

export const fakeCardData = {
  _id: new ObjectId(),
  userId: new ObjectId(),
  pages: [
    {
      pageNumber: 1,
      pageFeatures: [
        {
          featureType: "header",
          textContent: "Welcome to the Page!",
          textColor: "blue",
        },
        {
          featureType: "body",
          textContent: "This is the body text content of the page.",
          textColor: "black",
        },
        {
          featureType: "asset",
          assetType: "image",
          imageFeatureType: "single",
          imageUrl: "https://example.com/image.jpg",
        },
        {
          featureType: "asset",
          assetType: "spotifyPplaylistUrl",
          playlistUrl: "https://spotify.com/playlist/1234567890",
        },
      ],
      pageColor: "lightgray",
    },
    {
      pageNumber: 2,
      pageFeatures: [
        {
          featureType: "header",
          textContent: "Second Page",
          textColor: "green",
        },
        {
          featureType: "body",
          textContent: "More detailed content for the second page.",
          textColor: "darkgray",
        },
        {
          featureType: "asset",
          assetType: "image",
          imageFeatureType: "carousell",
          imageUrl: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
          ],
        },
      ],
      pageColor: "white",
    },
  ],
};
