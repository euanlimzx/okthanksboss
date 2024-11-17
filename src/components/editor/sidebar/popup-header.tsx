import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PageFeature, TextFeature } from "@/types/pageFeatures";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export function PopupHeader({
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
    <Dialog
      onOpenChange={(e) => {
        console.log(e);
      }}
      // TODO @EUAN Add in "your changes have not been saved popup"
    >
      <DialogTrigger asChild>
        <div>
          <span className="text-lg">Header</span>
          <div className="mt-2 min-h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-gray-700 p-3">
            {feature.textContent.length != 0 ? (
              feature.textContent
            ) : (
              <span className="text-gray-400">Enter your header</span>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Header</DialogTitle>
          <DialogDescription>
            This will appear in big big text :D
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Textarea
            className="text-black"
            value={textAreaValue}
            onChange={handleTextAreaChange}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={submitTextArea}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
