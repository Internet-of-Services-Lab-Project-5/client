import { createContext, useEffect, useState } from "react";
import {
  getAirlines,
  getCandidate,
  onAdded,
  onProposed,
  onRejected,
} from "../requests";

type Props = {
  children: React.ReactNode;
};

export const AirlineContext = createContext({
  candidate: "",
  airlines: [""],
  eventType: "",
});

export const AirlineProvider: React.FC<Props> = ({ children }) => {
  const [candidate, setCandidate] = useState("");
  const [airlines, setAirlines] = useState<string[]>([]);
  const [eventType, setEventType] = useState<
    "proposed" | "added" | "rejected" | ""
  >("");

  useEffect(() => {
    onProposed(async () => {
      const fetchedCandidate = await getCandidate();
      setCandidate(fetchedCandidate);
      setEventType("proposed");
    });
    onAdded(async () => {
      const fetchedAirlines = await getAirlines();
      setAirlines(fetchedAirlines);
      setEventType("added");
    });
    onRejected(async () => {
      setEventType("rejected");
    });
  }, []);

  return (
    <AirlineContext.Provider value={{ candidate, airlines, eventType }}>
      {children}
    </AirlineContext.Provider>
  );
};
