import Sidebar from "@/components/editor/sidebar";
import { Card, Page } from "@/types/card";
import { useEffect, useState } from "react";
import { fakeCardData } from "@/docs/dbSchema/card";

export default function Index() {
  const [card, setCard] = useState<Card>();
  useEffect(() => {
    setCard(fakeCardData);
    //TODO @EUAN settle typescript errors
  }, []);
  //TODO @EUAN function that needs to handle creating of new page very nicely
  function newPage() {
    setCard((card) => {
      const newPage = {};
      card?.pages = { ...card?.pages };
    });
  }
  //TODO @EUAN function that needs to handle updating of new page very nicely
  //TODO @EUAN function that includs adding new features to new Page very nicely

  if (!card) {
    return <div>This card could not be found.</div>;
  }
  return <Sidebar card={card} setCard={setCard} />;
}
