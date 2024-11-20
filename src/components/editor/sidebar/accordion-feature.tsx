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
  if (feature.featureType === zodFeatureType.enum.header) {
    return (
      <HeaderEditor
        feature={feature}
        updateCardOnFeatureUpdate={updateCardOnFeatureUpdate}
      />
    );
    //settle other featuretypes later
  }
}
