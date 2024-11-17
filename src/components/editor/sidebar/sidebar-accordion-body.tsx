//Logic Component
import { Page } from "@/types/card";
import { PageFeature } from "@/types/pageFeatures";
import AccordionFeature from "./accordion-feature";
import {
  updateCardOnFeatureUpdate,
  updateCardOnPageUpdate,
} from "@/types/editor";

export default function SidebarAccordionBody({
  page,
  updateCardOnPageUpdate,
}: {
  page: Page;
  updateCardOnPageUpdate: updateCardOnPageUpdate;
}) {
  //pageFeatures is an array that is sorted based on the order we want components to appear in
  //Popup Component conditionally renders different popups based on featureType
  //if user drags and drops, change featureOrder property https://www.youtube.com/watch?v=wMo8Ugn35LQ&ab_channel=WebDevCody
  //Edge case => we will need to pre-provide features that does not exist yet, but this cannot affect the actual order of stuffs.
  //rerun the rendering of features every time we add, remove, or re-order features
  //handle drag and drog, handle saving etc.

  //given any featureType object, update state
  const updateCardOnFeatureUpdate: updateCardOnFeatureUpdate = (
    newFeature: PageFeature,
  ) => {
    //No idea why this is a problem, I'm clearly reassigning newFeatures[i]
    // eslint-disable-next-line prefer-const
    let newPageFeatures = [...page.pageFeatures];
    let found = false;

    for (let i = 0; i < newPageFeatures.length; i++) {
      const oldFeature = newPageFeatures[i];
      if (oldFeature.featureType == newFeature.featureType) {
        newPageFeatures[i] = newFeature;
        found = true;
      }
    }
    if (!found) {
      newPageFeatures = [...newPageFeatures, newFeature];
    }

    updateCardOnPageUpdate(page.pageNumber, {
      ...page,
      pageFeatures: newPageFeatures,
    });
  };
  return (
    <div className="space-y-10 pb-10">
      {page.pageFeatures &&
        page.pageFeatures.map((feature, index) => {
          return (
            <AccordionFeature
              feature={feature}
              key={index}
              updateCardOnFeatureUpdate={updateCardOnFeatureUpdate}
            />
          );
        })}
    </div>
  );
}
