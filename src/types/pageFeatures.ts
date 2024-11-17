import { z } from "zod";

// const zodPageFeature = z.enum([])

export const zodFeatureType = z.enum(["spotifyPlaylistUrl", "image", "text"]);
export type FeatureType = z.infer<typeof zodFeatureType>;

export const zodTextType = z.enum(["header", "body"]);
export type TextType = z.infer<typeof zodTextType>;

export const zodImageFeatureType = z.enum(["single", "fan", "carousell"]);
export type ImageFeatureType = z.infer<typeof zodImageFeatureType>;

export const zodBaseFeature = z.object({
  featureType: zodFeatureType,
});
export type BaseFeature = z.infer<typeof zodBaseFeature>;

export const zodTextFeature = zodBaseFeature.extend({
  featureType: z.literal(zodFeatureType.enum.text),
  textContent: z.string(),
  textColor: z.string(),
  textType: zodTextType,
});
export type TextFeature = z.infer<typeof zodTextFeature>;

export const zodImageFeature = zodBaseFeature.extend({
  featureType: z.literal(zodFeatureType.enum.image),
  imageUrls: z.array(z.string()),
  imageFeatureType: zodImageFeatureType,
});

export type ImageFeature = z.infer<typeof zodImageFeature>;

// Spotify Playlist URL Feature Schema
export const zodSpotifyPlaylistUrlFeature = zodBaseFeature.extend({
  featureType: z.literal(zodFeatureType.enum.spotifyPlaylistUrl),
  playlistUrl: z.string(),
});

export type SpotifyPlaylistUrl = z.infer<typeof zodSpotifyPlaylistUrlFeature>;

export const zodPageFeature = z.union([
  zodImageFeature,
  zodTextFeature,
  zodSpotifyPlaylistUrlFeature,
]);

export type PageFeature = z.infer<typeof zodPageFeature>;
