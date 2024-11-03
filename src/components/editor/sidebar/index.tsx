import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FormFields from "./form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Sidebar() {
  const [numberOfItems, setNumberOfItems] = useState(5);
  return (
    <div className="h-screen w-3/12 overflow-y-auto border-r bg-background">
      <Accordion type="single" collapsible className="w-full">
        {Array(numberOfItems)
          .fill(null)
          .map((pageNum, index) => (
            <AccordionItem value={`page-${index + 1}`} key={index + 1}>
              <AccordionTrigger className="hover:bg-muted/50 px-4 py-2">
                Page {index + 1}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <FormFields />
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
  );
}
