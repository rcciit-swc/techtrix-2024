import { CategoryState } from "@/types/events";
import { create } from "zustand";


interface EventState {
    events: CategoryState[] | undefined;
    setEvents: (events: CategoryState[] | undefined) => void;
}

export const useEventbyCategory = create<EventState>((set) => ({
    events: undefined,
    setEvents: (events) => set({ events }),
}));
