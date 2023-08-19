import React from "react";
import { v4 as uuid } from "uuid";
import PlayingCard from "./PlayingCard";
import { useAxios } from "./hooks";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const BASE_URL = "https://deckofcardsapi.com/api/deck/new/draw/";
  const [cardsData, addCardData, clearCards] = useAxios(BASE_URL);

  const addCard = () => {
    addCardData();
  };
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
        <button onClick={clearCards}>Clear all playing cards!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cardsData.map(cardData => (
          <PlayingCard key={uuid()} front={cardData.cards[0].image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
