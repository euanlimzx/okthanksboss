import { Page } from "./card";

export type updateCardOnPageUpdate = (
  pageNumber: number,
  updatedPage: Page,
) => void;
