import { BaseFeature, FeatureType, PageFeature } from "@/types/pageFeatures";
import { PopupHeader } from "./popup-header";

export default function AccordionFeature({
  feature,
}: {
  feature: PageFeature | BaseFeature;
}) {
  if (feature.featureType == FeatureType.Text) {
    return <PopupHeader feature={feature} />;
  } else if (feature.featureType == FeatureType.Image) {
    return <div>image</div>;
  } else if (feature.featureType == FeatureType.SpotifyPlaylistUrl) {
    return <div>spotify</div>;
  }
}
