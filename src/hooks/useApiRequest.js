import { useCallback, useState } from 'react';

export default function useApiRequest(apiFunction, options) {
  const { initData = null } = options || {}; // initData = null : initData 을 외부에서 설정 안할 때 기본값.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initData);

  const execute = useCallback(
    async (params, executeOptions) => {
      const { onSuccess, onError } = executeOptions || {}; // try-catch 문 밖에 있어야. onError 사용 가능.
      // executeOptions 설정 안 하면 : { onSuccess, onError } = {} 된다. 값에 키 없으므로 onSuccess = undefined, onError = undefined
      //                            아래에서는 값이 있을 때만 하므로 문제 없음.

      try {
        setIsLoading(true);
        setError(null);

        await new Promise(resolver => setTimeout(resolver, 1000));

        const response = await apiFunction(params);
        setData(response?.data); // response = undefined 이면 response.data 을 하지 않고 결과를 undefined 로 한다는건가?
        if (onSuccess) onSuccess(response);
      } catch (err) {
        setError(err);
        if (onError) onError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction],
  );

  return { isLoading, error, data, execute };
}
