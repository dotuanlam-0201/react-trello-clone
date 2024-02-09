import { queryClient } from "../main";
import { IResponse } from "../utils/http";

export const useGetFetchQuery: (key: string[]) => IResponse<any> | undefined = (key: string[]) => {
    return queryClient.getQueryData(key)
};