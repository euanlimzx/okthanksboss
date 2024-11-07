import { Page } from "@/types/card";
import { FeatureType, BaseFeature } from "@/types/pageFeatures";
import AccordionFeature from "./accordion-feature";

export default function SidebarAccordionBody({ page }: { page: Page }) {
  //pageFeatures is an array that is sorted based on the order we want components to appear in
  //Popup Component conditionally renders different popups based on featureType
  //if user drags and drops, change featureOrder property https://www.youtube.com/watch?v=wMo8Ugn35LQ&ab_channel=WebDevCody
  //Edge case => we will need to pre-provide features that does not exist yet, but this cannot affect the actual order of stuffs.x
  //rerun the rendering of features every time we add, remove, or re-order features
  //handle drag and drog, handle saving etc.
  function renderUnitializedFeatures(page: Page) {
    const presentPageFeatures = page.pageFeatures ?? [];
    const missing: BaseFeature[] = [];
    // Create a set of the feature types already present in the pageFeatures array
    const presentFeatureTypes = new Set(
      presentPageFeatures?.map((feature) => feature.featureType),
    );

    // Loop through all possible feature types and check if each one is missing
    for (const feature of Object.values(FeatureType)) {
      if (!presentFeatureTypes.has(feature)) {
        missing.push({
          featureType: feature,
        }); // Add missing feature type to the missing array
      }
    }
    return missing;
  }
  return (
    <div className="space-y-10 pb-10">
      {page.pageFeatures &&
        page.pageFeatures.map((feature, index) => {
          return <AccordionFeature feature={feature} key={index} />;
        })}
      <div>MISSING:</div>
      {renderUnitializedFeatures(page).map((feature, index) => {
        return <AccordionFeature feature={feature} key={index} />;
      })}
    </div>
  );
}
