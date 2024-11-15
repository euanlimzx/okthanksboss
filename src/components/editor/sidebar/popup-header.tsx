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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BaseFeature, TextFeature } from "@/types/pageFeatures";

export function PopupHeader({
  feature,
}: {
  feature: TextFeature | BaseFeature;
}) {
  function showTextContent(feature: TextFeature | BaseFeature) {
    if ("textContent" in feature && feature.textContent.length != 0) {
      return feature.textContent;
    } else {
      return "";
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <span className="text-lg">Header</span>
          <div className="mt-2 min-h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-gray-700 p-3">
            {"textContent" in feature && feature.textContent.length != 0 ? (
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
          <Textarea className="text-black" />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
