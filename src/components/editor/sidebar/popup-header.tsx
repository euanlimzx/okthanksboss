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
import { BaseFeature, TextFeature } from "@/types/pageFeatures";

export function PopupHeader({
  feature,
}: {
  feature: TextFeature | BaseFeature;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <span className="pb-10 text-lg">Header</span>
          <div className="min-h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-gray-700 p-3">
            {"textContent" in feature && feature.textContent.length != 0 ? (
              feature.textContent
            ) : (
              <span className="text-gray-300">Enter a header</span>
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
        {/* TODO @EUAN: Fucking fix this */}
        <div className="grid gap-4">
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
