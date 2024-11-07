import Sidebar from "@/components/editor/sidebar";
import { Card } from "@/types/card";
import { useEffect, useState } from "react";
import { fakeCardData } from "@/docs/dbSchema/card";

export default function Index() {
  const [card, setCard] = useState<Card>();
  useEffect(() => {
    setCard(fakeCardData);
    //TODO @EUAN settle typescript errors
  }, []);
  if (!card) {
    return <div>This card could not be found.</div>;
  }
  //TODO @EUAN function that needs to handle creating of new page very nicely
  function newPage() {
    setCard((prevCard) => {
      if (!prevCard) return prevCard; // Handle case where prevCard might be null/undefined.
      const newPage = {
        pageNumber: prevCard.pages.length + 1,
      };
      // Create a new copy of card with the updated pages array
      return {
        ...prevCard,
        pages: [...prevCard.pages, newPage],
      };
    });
  }
  //TODO @EUAN function that needs to handle updating of new page very nicely
  //TODO @EUAN function that includs adding new features to new Page very nicely
  return <Sidebar card={card} setCard={setCard} newPage={newPage} />;
}
