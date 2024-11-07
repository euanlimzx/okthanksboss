export type PageFeature =
  | ImageFeature
  | TextFeature
  | SpotifyPlaylistUrlFeature;

export interface BaseFeature {
  featureType: FeatureType;
}

export interface TextFeature extends BaseFeature {
  featureType: FeatureType.Text;
  textContent: string;
  textColor: string;
  textType: TextType;
}

export interface ImageFeature extends BaseFeature {
  featureType: FeatureType.Image;
  imageUrls: string[];
  imageFeatureType: ImageFeatureType;
}

export interface SpotifyPlaylistUrlFeature extends BaseFeature {
  featureType: FeatureType.SpotifyPlaylistUrl;
  playlistUrl: string;
}

export enum FeatureType {
  SpotifyPlaylistUrl = "spotifyPlaylistUrl",
  Image = "image",
  Text = "text",
}

enum TextType {
  Header = "header",
  Body = "body",
}

enum ImageFeatureType {
  Single = "single",
  Fan = "fan",
  Carousell = "carousell",
}
