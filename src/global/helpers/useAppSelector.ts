import { TypedUseSelectorHook, useSelector } from "react-redux";
import { initialState } from "../reducers/mainReducer";

const useAppSelector: TypedUseSelectorHook<typeof initialState> = useSelector;

export default useAppSelector;
