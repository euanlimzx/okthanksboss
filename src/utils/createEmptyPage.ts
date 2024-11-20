import { Page } from "@/types/card";

export function createEmptyPage(): Page {
  return {
    pageNumber: 1,
    pageFeatures: [
      {
        featureType: "header",
        textContent: "",
        textColor: "black",
      },
      {
        featureType: "body",
        textContent: "",
        textColor: "black",
      },
      // TODO: change if necessary welps, not sure what to add for asset
    ],
    pageColor: "white",
  };
}
