export const fetcher = async ({url, method, body, json = true}: any) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if(!res.ok) {
    throw new Error('API Error!')
  }

  if(json) {
    const data = await res.json()
    return data.data
  }

}

export const register = (user: any) => {
  return fetcher({url: '/api/register', method:'post', body: user, json: false})
}

export const signin = (user: any) => {
  return fetcher({url: '/api/signin', method:'post', body: user, json: false})
}