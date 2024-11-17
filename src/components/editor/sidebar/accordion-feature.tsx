//logic component
import { FeatureType, PageFeature } from "@/types/pageFeatures";
import { PopupHeader } from "./popup-header";

export default function AccordionFeature({
  feature,
  updateCardOnFeatureUpdate,
}: {
  feature: PageFeature;
  updateCardOnFeatureUpdate: (newFeature: PageFeature) => void;
}) {
  if (feature.featureType == FeatureType.Text) {
    return (
      <PopupHeader
        feature={feature}
        updateCardOnFeatureUpdate={updateCardOnFeatureUpdate}
      />
    );
  } else if (feature.featureType == FeatureType.Image) {
    return <div>image</div>;
  } else if (feature.featureType == FeatureType.SpotifyPlaylistUrl) {
    return <div>spotify</div>;
  }
}
