export const getRandomIntegerInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const areUrlsSimilar = (urlString: string, compareUrlString: string): boolean => {
  try {
    const url = new URL(urlString)
    const compareToUrl = new URL(compareUrlString)

    if (url.origin !== compareToUrl.origin || url.pathname !== compareToUrl.pathname) {
      return false
    }

    return true
  } catch {
    return false
  }
}
