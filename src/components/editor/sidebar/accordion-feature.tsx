//logic component
import { PageFeature, zodFeatureType } from "@/types/pageFeatures";
import { HeaderEditor } from "./header-editor";
import { updateCardOnFeatureUpdate } from "@/types/editor";

export default function AccordionFeature({
  feature,
  updateCardOnFeatureUpdate,
}: {
  feature: PageFeature;
  updateCardOnFeatureUpdate: updateCardOnFeatureUpdate;
}) {
  if (feature.featureType == zodFeatureType.enum.text) {
    return (
      <HeaderEditor
        feature={feature}
        updateCardOnFeatureUpdate={updateCardOnFeatureUpdate}
      />
    );
  } else if (feature.featureType == zodFeatureType.enum.image) {
    return <div>image</div>;
  } else if (feature.featureType == zodFeatureType.enum.spotifyPlaylistUrl) {
    return <div>spotify</div>;
  }
}
