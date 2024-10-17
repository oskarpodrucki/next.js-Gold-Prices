'use client'
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react";

export default function Home() {
  const [prices, setPrices] = useState([]); 

  useEffect(() => {
    const getPrices = async () => {
      try {
        const res = await fetch("https://api.nbp.pl/api/cenyzlota/last/30/?format=json");
        const dataJson = await res.json();
        setPrices(dataJson.reverse()); 
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
      <div className="flex flex-row flex-wrap justify-center items-center h-screen">
        {prices.length > 0 && prices.map((price, idx) => {
          const currentPrice = price.cena.toFixed(2);
          const previousPrice = idx < prices.length - 1 ? prices[idx + 1].cena.toFixed(2) : null;

          let arrowIcon = null;
          let priceDifference = null;

          if (previousPrice !== null) {
            const difference = (currentPrice - previousPrice).toFixed(2);
            priceDifference = difference > 0 ? `+${difference}` : difference;

            arrowIcon = currentPrice > previousPrice ? (
              <TrendingUp className="mt-7 mr-2" color="#4ae32b" size={64} strokeWidth={2} />
            ) : (
              <TrendingDown className="mt-7 mr-2" color="#ff0000" size={64} strokeWidth={2} />
            );
          }

          return (
            <Card key={idx} className="flex justify-center items-center w-[325px] h-[100px] mt-5 ml-5">
              <div className="flex flex-col ml-4 w-[200px]">
                <CardTitle>cena: {currentPrice} zł</CardTitle>
                <CardDescription>data: {price.data}</CardDescription>
              </div>
              <CardContent className="flex flex-row items-center">
                {arrowIcon}
                <span className="ml-2 mt-6">{priceDifference}zł</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
