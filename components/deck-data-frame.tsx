import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { formatter } from "../utils";

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

    const TYPE_COLORS: any = {
        "Pokémon": "#78C850",
        "Trainer": "#F08030",
        "Energy": "#6890F0",
    }

    const [deckData, setDeckData] = useState<any>([]);
    const [energyData, setEnergyData] = useState<any>([]);
    const [costData, setCostData] = useState<any>([]);
    const [totalCost, setTotalCost] = useState<string>("");


    let cardDataObject: any = {};
    let cardEnergyData: any = [['Energy Type', 'Count', { role: 'style' }]];
    let cardEnergyObject: any = {};

    let costDataObject: any = {};
    let costTypeData: any = [['Card Type', 'Total Price', { role: 'style' }]];

    useEffect(() => {
        if (!deck.cards) return;
        console.log('deck');
        let cardData = [['Card Type', 'Card Count']];
        for (let key of Object.keys(deck.cards)) {
            let card = deck.cards[key];
            cardDataObject[card.cardType] = cardDataObject[card.cardType] ? cardDataObject[card.cardType] + card.cardCount : card.cardCount;
            if (card.cardType === 'Pokémon') {
                for (let energyType of card.cardEnergyTypes) {
                    cardEnergyObject[energyType] = cardEnergyObject[energyType] ? cardEnergyObject[energyType] + card.cardCount : card.cardCount;
                }

            }

            let lowest = Object.keys(card.cardPriceInfo.prices)[0]
            costDataObject[card.cardType] = costDataObject[card.cardType] ? costDataObject[card.cardType] + card.cardPriceInfo.prices[lowest]['market'] : card.cardPriceInfo.prices[lowest]['market'];
        }

        cardData.push(['Pokémon', cardDataObject['Pokémon']]);
        cardData.push(['Trainer', cardDataObject['Trainer']]);
        cardData.push(['Energy', cardDataObject['Energy']]);

        let cost = 0
        if (cardEnergyData.length === 1) {
            for (let type in costDataObject) {
                costTypeData.push([type, costDataObject[type], TYPE_COLORS[type]]);
                cost += costDataObject[type];
            }
        }

        if (cardEnergyData.length === 1) {
            for (let type in cardEnergyObject) {
                cardEnergyData.push([type, cardEnergyObject[type], COLORS[type]]);
            }
        }
        setTotalCost(cost.toString());
        setDeckData(cardData);
        setEnergyData(cardEnergyData);
        setCostData(costTypeData);

    }, [deck, totalCost]);




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
            minValue: 0,
            maxValue: 60,
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        },
        hAxis: {
            minValue: 0,
            maxValue: 60,
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        },
    }

    // Need to display the values of each type of card next to the chart
    const costOption = {
        title: `Deck Cost - Market (${formatter.format(parseFloat(totalCost))})`,
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
        },
        vAxis: {
            minValue: 0,
            maxValue: 60,
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        },
        hAxis: {
            minValue: 0,
            maxValue: 60,
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
        },

    }


    const chartEvents = [
        {
            eventName: "select",
            callback({ chartWrapper }: any) {
                console.log("Selected ", chartWrapper.getChart().getSelection());
            }
        }
    ];

    return (
        <>
            {deck.cards && <div className='w-auto mt-6 h-auto bg-zinc-00 rounded-xl mx-1'>
                <span className='rounded-xl ml-3 mr-2 w-full h-auto bg-zinc-800 2xl:flex 2xl:flex-row justify-between grid grid-cols-2'>
                    {deckData && <Chart
                        className='rounded-xl'
                        chartType="PieChart"
                        data={deckData}
                        options={options}
                        width={"auto"}
                        height={"280px"}

                    />}

                    {energyData && <Chart chartType="ColumnChart" width="auto" height="250px" data={energyData} options={barOptions} legendToggle />}
                    {costData && <Chart
                        className='rounded-xl'
                        chartType="PieChart"
                        data={costData}
                        options={costOption}
                        width={"auto"}
                        height={"280px"}

                    />

                    }
                </span>
            </div>}
        </>
    )
}