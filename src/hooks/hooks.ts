import { AppDispatch } from "../types/dispatch";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../types/state";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
