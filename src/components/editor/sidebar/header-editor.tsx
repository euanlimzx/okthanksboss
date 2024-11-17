import { PageFeature, TextFeature } from "@/types/pageFeatures";
import { useEffect, useState } from "react";
import { HeaderEditorUI } from "./header-editor-ui";

export function HeaderEditor({
  feature,
  updateCardOnFeatureUpdate,
}: {
  feature: TextFeature;
  updateCardOnFeatureUpdate: (newFeature: PageFeature) => void;
}) {
  const [textAreaValue, setTextAreaValue] = useState("");

  useEffect(() => {
    if ("textContent" in feature && feature.textContent.length != 0) {
      setTextAreaValue(feature.textContent);
    } else {
      setTextAreaValue("");
    }
  }, [feature]);

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(event.target.value);
  }

  function submitTextArea() {
    updateCardOnFeatureUpdate({ ...feature, textContent: textAreaValue });
  }
  return (
    <HeaderEditorUI
      feature={feature}
      handleTextAreaChange={handleTextAreaChange}
      submitTextArea={submitTextArea}
      textAreaValue={textAreaValue}
    />
  );
}
