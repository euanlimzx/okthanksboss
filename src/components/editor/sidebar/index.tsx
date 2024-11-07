import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SidebarAccordionBody from "./sidebar-accordion-body";
import { Card } from "@/types/card";

export default function Sidebar({
  card,
  setCard,
}: {
  card: Card;
  setCard: React.Dispatch<React.SetStateAction<Card>>;
}) {
  return (
    <div className="flex h-screen w-screen bg-slate-300">
      <div className="h-screen w-3/12 overflow-y-auto border-r bg-background">
        <Accordion type="single" collapsible className="w-full">
          {card.pages.map((page, index) => (
            <AccordionItem value={`page-${index + 1}`} key={index + 1}>
              <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 font-semibold">
                Page {index + 1}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <SidebarAccordionBody />
              </AccordionContent>
              {/* Accordion content will likely read the contents of the array */}
            </AccordionItem>
          ))}
        </Accordion>
        {/* TODO @EUAN: Best behaviour is to open newly added accordion */}
        <div className="w-100 flex justify-center">
          <Button
            variant="outline"
            className="my-5 w-60 text-black"
            onClick={() => {
              setNumberOfItems(numberOfItems + 1);
            }}
          >
            {/* This should create a new accordion item */}
            <p className="text-l">+ New Page</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
