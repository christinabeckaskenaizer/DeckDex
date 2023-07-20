interface Props {
  deck: any;
}

export default function DeckViewHeader({ deck }: Props) {

    console.log("DECK", deck);
  return (
    <div className="flex flex-col w-full h-44 mx-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-2">{deck.name}</h1>
          <h2 className="text-sm mb-4">{deck.description}</h2>
          {/* <h3>{deck.User.userName}</h3> */}
        </div>
      </div>
    </div>
  );
}
