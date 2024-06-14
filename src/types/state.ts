import { store } from "../services/store/store";

export type RootState = ReturnType<typeof store.getState>;
