import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { equals } from "ramda";

function useDeepCompareMemoize(value: DependencyList) {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!equals(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return [signalRef.current];
}

export function useDeepEffect(
  callback: EffectCallback,
  dependencies: DependencyList
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
}

type useMemoParams = Parameters<typeof useMemo>;

export function useDeepMemo(
  callback: useMemoParams[0],
  dependencies: DependencyList
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(callback, useDeepCompareMemoize(dependencies));
}
type useCallbackParams = Parameters<typeof useCallback>;

export function useDeepCallback(
  callback: useCallbackParams[0],
  dependencies: DependencyList
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, useDeepCompareMemoize(dependencies));
}
