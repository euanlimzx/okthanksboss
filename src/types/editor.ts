import { Page } from "./card";
import { PageFeature } from "./pageFeatures";

export type updateCardOnPageUpdate = (
  pageNumber: number,
  updatedPage: Page,
) => void;

export type updateCardOnFeatureUpdate = (newFeature: PageFeature) => void;
