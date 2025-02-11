import React, { useState, useEffect } from "react";
import {
  ArrowDownUp,
  AlertCircle,
  ChevronDown,
  Loader2,
  Search,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface PriceData {
  currency: string;
  date: string;
  price: number;
}

interface TokenSelection {
  type: "from" | "to";
  isOpen: boolean;
}

const App = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("WBTC");
  const [error, setError] = useState("");
  const [tokenSelection, setTokenSelection] = useState<TokenSelection | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");

  // Sample token metadata
  const tokenMetadata: Record<string, { name: string; balance: string }> = {
    ETH: { name: "Ethereum", balance: "2.5" },
    WBTC: { name: "Wrapped Bitcoin", balance: "0.15" },
    USDC: { name: "USD Coin", balance: "5000" },
    BLUR: { name: "Blur", balance: "1000" },
    GMX: { name: "GMX", balance: "100" },
    ATOM: { name: "Cosmos", balance: "50" },
    OSMO: { name: "Osmosis", balance: "200" },
    EVMOS: { name: "Evmos", balance: "300" },
    SWTH: { name: "Switcheo Token", balance: "10000" },
  };

  const getTokenIconUrl = (symbol: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) throw new Error("Failed to fetch prices");
        const data = await response.json();

        const latestPrices = data.reduce(
          (acc: Record<string, PriceData>, curr: PriceData) => {
            if (
              !acc[curr.currency] ||
              new Date(curr.date) > new Date(acc[curr.currency].date)
            ) {
              acc[curr.currency] = curr;
            }
            return acc;
          },
          {}
        );

        setPrices(Object.values(latestPrices));
        setIsLoading(false);
      } catch (err) {
        setLoadingError("Failed to load prices. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getPrice = (currency: string): number | null => {
    const priceData = prices.find((p) => p.currency === currency);
    return priceData ? priceData.price : null;
  };

  const calculateExchangeRate = (from: string, to: string): number | null => {
    const fromPrice = getPrice(from);
    const toPrice = getPrice(to);

    if (fromPrice && toPrice) {
      return toPrice / fromPrice;
    }
    return null;
  };

  const calculateToAmount = (value: string) => {
    if (!value) {
      setToAmount("");
      return;
    }

    const rate = calculateExchangeRate(fromCurrency, toCurrency);
    if (rate !== null) {
      const calculatedAmount = (parseFloat(value) / rate).toFixed(6);
      setToAmount(calculatedAmount);
    }
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
      calculateToAmount(value);

      const token = tokenMetadata[fromCurrency];
      if (token && parseFloat(value) > parseFloat(token.balance)) {
        setError(`Insufficient ${fromCurrency} balance`);
      } else {
        setError("");
      }
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    calculateToAmount(toAmount);
  };

  const handleSelectToken = (currency: string) => {
    if (tokenSelection?.type === "from") {
      setFromCurrency(currency);
    } else {
      setToCurrency(currency);
    }
    closeTokenSelection();
  };

  const openTokenSelection = (type: "from" | "to") => {
    setTokenSelection({ type, isOpen: true });
    setSearchQuery("");
  };

  const closeTokenSelection = () => {
    setTokenSelection(null);
    setSearchQuery("");
  };

  const filteredTokens = prices
    .filter((token) => {
      const matchesSearch = token.currency
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isNotSelected =
        token.currency !==
        (tokenSelection?.type === "from" ? toCurrency : fromCurrency);
      return matchesSearch && isNotSelected;
    })
    .sort((a, b) => a.currency.localeCompare(b.currency));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (loadingError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{loadingError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Exchange Coin</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <AlertCircle className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-500">From</label>
              <span className="text-sm text-gray-500">
                Balance: {tokenMetadata[fromCurrency]?.balance} {fromCurrency}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={fromAmount}
                onChange={handleFromAmountChange}
                className="w-full bg-transparent text-2xl outline-none"
                placeholder="0.0"
              />
              <Button
                variant="outline"
                className="flex items-center space-x-2 min-w-[120px]"
                onClick={() => openTokenSelection("from")}
              >
                <img
                  src={getTokenIconUrl(fromCurrency)}
                  alt={fromCurrency}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400?text=Token";
                  }}
                />
                <span>{fromCurrency}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center -my-3 relative z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
              onClick={handleSwapCurrencies}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          {/* To Currency Input */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-500">To</label>
              <span className="text-sm text-gray-500">
                Balance: {tokenMetadata[toCurrency]?.balance} {toCurrency}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={toAmount}
                readOnly
                className="w-full bg-transparent text-2xl outline-none"
                placeholder="0.0"
              />
              <Button
                variant="outline"
                className="flex items-center space-x-2 min-w-[120px]"
                onClick={() => openTokenSelection("to")}
              >
                <img
                  src={getTokenIconUrl(toCurrency)}
                  alt={toCurrency}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400?text=Token";
                  }}
                />
                <span>{toCurrency}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="text-sm text-gray-500 text-center">
            1 {fromCurrency} ={" "}
            {calculateExchangeRate(fromCurrency, toCurrency)?.toFixed(6)}{" "}
            {toCurrency}
          </div>
        </div>
      </Card>
      <Dialog
        open={!!tokenSelection?.isOpen}
        onOpenChange={() => closeTokenSelection()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Select a token ({tokenSelection?.type === "from" ? "From" : "To"})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search token by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredTokens.map((token) => (
                <Button
                  key={token.currency}
                  variant="ghost"
                  className="w-full justify-between hover:bg-gray-100"
                  onClick={() => handleSelectToken(token.currency)}
                >
                  <div className="flex items-center">
                    <img
                      src={getTokenIconUrl(token.currency)}
                      alt={token.currency}
                      className="w-8 h-8 rounded-full mr-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/400?text=Token";
                      }}
                    />
                    <div className="text-left">
                      <div className="font-medium">{token.currency}</div>
                      <div className="text-sm text-gray-500">
                        {tokenMetadata[token.currency]?.name || token.currency}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {tokenMetadata[token.currency]?.balance || "0"}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${token.price.toFixed(2)}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
