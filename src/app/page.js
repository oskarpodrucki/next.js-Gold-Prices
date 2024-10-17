'use client'
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Home() {
  const [prices, setPrices] = useState([]); // Zainicjuj pustą tablicą

  useEffect(() => {
    const getPrices = async () => {
      try {
        const res = await fetch("https://api.nbp.pl/api/cenyzlota/last/30/?format=json");
        const dataJson = await res.json();
        setPrices(dataJson.reverse()); // Odwróć dane, aby mieć najnowsze ceny na początku
      } catch (error) {
        console.log(error);
      } finally {
        console.log("pobrano ceny złota ;)");
      }
    };
    getPrices();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center">ceny złota 🤑🤑🤑</h1>
      <div className="flex flex-row flex-wrap justify-center items-center h-screen">
        {prices.length > 0 && prices.map((price, idx) => {
          const currentPrice = price.cena;
          const previousPrice = idx < prices.length - 1 ? prices[idx + 1].cena : null;

          let arrowIcon = null;
          if (previousPrice !== null) {
            arrowIcon = currentPrice > previousPrice ? (
              <ArrowUp className="mt-5" color="#4ae32b" size={64} strokeWidth={2} />
            ) : (
              <ArrowDown className="mt-5" color="#ff0000" size={64} strokeWidth={2} />
            );
          }

          return (
            <Card key={idx} className="flex justify-center items-center w-[275px] h-[100px] ml-5">
              <div className="flex flex-col ml-10">
              <CardTitle>cena: {currentPrice}Zł</CardTitle>
              <CardDescription>data: {price.data}</CardDescription>
              </div>
              <CardContent>
                {arrowIcon}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
