import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IState } from "../reducers/mainReducerTypes";

const useAppSelector: TypedUseSelectorHook<IState> = useSelector;

export default useAppSelector;
