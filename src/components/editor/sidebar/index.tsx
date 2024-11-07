import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import SidebarAccordionBody from "./sidebar-accordion-body";
import { Card, Page } from "@/types/card";

export default function Sidebar({
  card,
  newPage,
}: {
  card: Card;
  setCard: React.Dispatch<React.SetStateAction<Card>>;
  newPage: VoidFunction;
}) {
  function AccordionItemTitleText(page: Page) {
    if ("pageFeatures" in page) {
      return "Feature Type";
      //TODO @EUAN make sure this displays the actual feature content
    } else {
      return "Blank Page";
    }
  }
  return (
    <div className="flex h-screen w-screen bg-slate-300">
      <div className="h-screen w-3/12 overflow-y-auto border-r bg-background">
        <Accordion type="single" collapsible className="w-full">
          {card.pages.map((page, index) => (
            <AccordionItem value={`page-${index + 1}`} key={page.pageNumber}>
              <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 font-semibold">
                {AccordionItemTitleText(page)}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <SidebarAccordionBody page={page} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {/* TODO @EUAN: Best behaviour is to open newly added accordion, if only one, should auto-open */}
        <div className="w-100 flex justify-center">
          <Button
            variant="outline"
            className="mx-10 my-5 w-60 text-black"
            onClick={() => {
              newPage();
            }}
          >
            <p className="text-l">+ New Page</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
