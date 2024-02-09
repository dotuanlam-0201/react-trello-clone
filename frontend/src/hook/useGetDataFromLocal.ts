export const useGetDataFromLocal = (key: string) => {
    return localStorage.getItem(key) || ''
}