//LOGIC COMPONENT
import Sidebar from "@/components/editor/sidebar";
import { Card } from "@/types/card";
import { useEffect, useState } from "react";
import { fakeCardData } from "@/docs/dbSchema/card";
import { updateCardOnPageUpdate } from "@/types/editor";

export default function Index() {
  const [card, setCard] = useState<Card>();
  useEffect(() => {
    setCard(fakeCardData);
    //TODO @EUAN settle typescript errors
  }, []);

  useEffect(() => {}, [card]);

  if (!card) {
    return <div>This card could not be found.</div>;
  }
  //function that needs to handle creating of new page very nicely
  function newPage() {
    setCard((prevCard) => {
      if (!prevCard) return prevCard; // Handle case where prevCard might be null/undefined.
      const newPage = {
        pageNumber: prevCard.pages.length + 1,
        pageFeatures: [],
      };
      // Create a new copy of card with the updated pages array
      return {
        ...prevCard,
        pages: [...prevCard.pages, newPage],
      };
    });
  }
  //TODO @EUAN How would you like errors to be handled for this?
  const updateCardOnPageUpdate: updateCardOnPageUpdate = (
    pageNumber,
    updatedPage,
  ) => {
    setCard((prevCard) => {
      if (!prevCard) return prevCard;

      // Update pages immutably and return the updated card (original state should not be mutated directly)
      const updatedPages = prevCard.pages.map((page) =>
        page.pageNumber === pageNumber ? { ...updatedPage } : page,
      );
      // Return a new object with the updated pages
      return { ...prevCard, pages: updatedPages };
    });
  };

  //TODO @EUAN function that includs adding new features to new Page very nicely
  // This function needs to prevent users from adding features if shit is already "filled up"
  // We might also need a deletion feature
  return (
    <Sidebar
      card={card}
      newPage={newPage}
      updateCardOnPageUpdate={updateCardOnPageUpdate}
    />
  );
}
