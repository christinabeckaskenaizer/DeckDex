import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Props {
    deck: any;
}

export default function DeckDataFrame({ deck }: Props) {

    const COLORS: any = {
        "Grass": "#78C850",
        "Fire": "#F08030",
        "Water": "#6890F0",
        "Lightning": "#F8D030",
        "Psychic": "#F85888",
        "Fighting": "#C03028",
        "Darkness": "#705848",
        "Metal": "#B8B8D0",
        "Fairy": "#EE99AC",
        "Dragon": "#7038F8",
        "Colorless": "#A8A878",
    }

    const [deckData, setDeckData] = useState<any>([]);
    const [energyData, setEnergyData] = useState<any>([]);


    let cardDataObject: any = {};
    let cardEnergyData: any = [['Energy Type', 'Count', { role: 'style' }]];
    let cardEnergyObject: any = {};

    useEffect(() => {
        if (!deck.cards) return;
        let cardData = [['Card Type', 'Card Count']];
        for (let card of deck.cards) {
            cardDataObject[card.cardType] = cardDataObject[card.cardType] ? cardDataObject[card.cardType] + card.cardCount : card.cardCount;
            if (card.cardEnergyTypes) {
                for (let type of card.cardEnergyTypes) {
                    cardEnergyObject[type] = cardEnergyObject[type] ? cardEnergyObject[type] + card.cardCount : card.cardCount;

                }
            }
        }
        cardData.push(['Pokémon', cardDataObject['Pokémon']]);
        cardData.push(['Trainer', cardDataObject['Trainer']]);
        cardData.push(['Energy', cardDataObject['Energy']]);

        for (let type in cardEnergyObject) {
            cardEnergyData.push([type, cardEnergyObject[type], COLORS[type]]);
        }
        setDeckData(cardData);
        setEnergyData(cardEnergyData);
    }, [deck]);




    const options = {
        title: 'Deck Composition',
        backgroundColor: 'transparent',
        titleTextStyle: {
            color: '#fff',
            fontSize: 14,
        },
        legend: {
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        }
    }

    const barOptions = {
        title: 'Pokemon Type Composition',
        backgroundColor: 'transparent',
        titleTextStyle: {
            color: '#fff',
            fontSize: 14,
        },
        legend: {
            'position': 'none'
        },
        vAxis: {
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        },
        hAxis: {
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        },
    }

    return (
        <>
            {deck.cards && <div className='items-center w-auto mx-4 mt-6 h-[30vh] bg-zinc-800 rounded-xl flex flex-row'>
                <span className='rounded-xl ml-3 mr-2 w-full h-64 bg-zinc-500 flex flex-row'>
                    {deckData && <Chart
                        className='rounded-xl'
                        chartType="PieChart"
                        data={deckData}
                        options={options}
                        width={"auto"}
                        height={"280px"}

                    />}

                    <Chart chartType="ColumnChart" width="auto" height="250px" data={energyData} options={barOptions} legendToggle />
                </span>
            </div>}
        </>
    )
}