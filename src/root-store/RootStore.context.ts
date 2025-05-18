import { createContext, useContext } from "react";
import RootStore from "./RootStore";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = <K extends keyof RootStore>(
	storeName: K,
): RootStore[K] => {
	const context = useContext(RootStoreContext);

	if (context === null) {
		throw new Error("");
	}

	return context[storeName];
};
