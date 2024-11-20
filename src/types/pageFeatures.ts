import { z } from "zod";

// const zodPageFeature = z.enum([])

export const zodFeatureType = z.enum(["header", "body", "asset"]);
export type FeatureType = z.infer<typeof zodFeatureType>;

export const zodBaseFeature = z.object({
  featureType: zodFeatureType,
});
export type BaseFeature = z.infer<typeof zodBaseFeature>;

export const zodHeaderFeature = zodBaseFeature.extend({
  featureType: z.literal(zodFeatureType.enum.header),
  textContent: z.string().default(""),
  textColor: z.string().default("black"),
});
export type HeaderFeature = z.infer<typeof zodHeaderFeature>;

export const zodBodyFeature = zodBaseFeature.extend({
  featureType: z.literal(zodFeatureType.enum.body),
  textContent: z.string().default(""),
  textColor: z.string().default("black"),
});
export type BodyFeature = z.infer<typeof zodBodyFeature>;

export const zodAssetType = z.enum(["image", "spotifyPlaylistUrl"]);
export type AssetType = z.infer<typeof zodAssetType>;

export const zodAssetFeature = zodBaseFeature.extend({
  featureType: z.literal(zodFeatureType.enum.asset),
  assetType: zodAssetType,
});
export type AssetFeature = z.infer<typeof zodAssetFeature>;

export const zodImageFeatureType = z.enum(["single", "fan", "carousell"]);
export type ImageFeatureType = z.infer<typeof zodImageFeatureType>;

export const zodSingleImageFeature = zodAssetFeature.extend({
  assetType: z.literal(zodAssetType.enum.image),
  imageFeatureType: z.literal(zodImageFeatureType.enum.single),
  imageUrl: z.string().url(),
});
export type SingleImageFeature = z.infer<typeof zodSingleImageFeature>;

// TODO: type still under construction
export const zodFanImageFeature = zodAssetFeature.extend({
  assetType: z.literal(zodAssetType.enum.image),
  imageFeatureType: z.literal(zodImageFeatureType.enum.fan),
  imageUrl: z.array(z.string().url()),
});
export type FanImageFeature = z.infer<typeof zodFanImageFeature>;

// TODO: type still under construction
export const zodCarousellImageFeature = zodAssetFeature.extend({
  assetType: z.literal(zodAssetType.enum.image),
  imageFeatureType: z.literal(zodImageFeatureType.enum.carousell),
  imageUrl: z.array(z.string().url()),
});
export type CarouSellImageFeature = z.infer<typeof zodCarousellImageFeature>;

// Spotify Playlist URL Feature Schema
export const zodSpotifyPlaylistUrlFeature = zodAssetFeature.extend({
  assetType: z.literal(zodAssetType.enum.spotifyPlaylistUrl),
  playlistUrl: z.string().url(),
});
export type SpotifyPlaylistUrl = z.infer<typeof zodSpotifyPlaylistUrlFeature>;

export const zodPageFeature = z.union([
  zodBodyFeature,
  zodHeaderFeature,
  zodAssetFeature,
]);

export type PageFeature = z.infer<typeof zodPageFeature>;
