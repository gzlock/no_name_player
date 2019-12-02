export function SecondsToString (seconds: number): string {
  let time: number[] = []
  if (seconds > 0) {
    // 分
    let temp = Math.floor(seconds / 60)
    time.push(temp)
    // 秒
    temp = Math.floor(seconds) - Math.floor(seconds / 60) * 60
    time.push(temp)
  } else {
    time.push(0, 0)
  }
  return time.map(item => {
    return item.toString().length === 1 ? '0' + item : item.toString()
  }).join(':')
}

export function LoadMimeType (url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest()
    http.open('GET', url)
    http.send()
    http.onreadystatechange = () => {
      if (http.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        if (http.status === 200) {
          const type = http.getResponseHeader('Content-Type')
          if (type) {
            resolve(type)
          } else {
            reject(new Error('No Content-Type'))
          }
        } else {
          reject(new Error('Http Status Not 200, return:' + http.status))
        }
        http.abort()
      }
    }
  })
}

export function Hash (str: string) {
  let hash = 0
  let i
  let chr
  if (str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export function RandomID (len: number = 6): string {
  const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let rtn = ''
  for (let i = 0; i < len; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  }
  return rtn
}
