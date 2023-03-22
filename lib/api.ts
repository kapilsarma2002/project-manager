export const fetcher = async ({url, method, body, json = true}: any) => {
  const res = await fetch(url, {
    method: method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  console.log('in api')
  if(!res.ok) {
    console.log('res is not ok')
    console.log(res)
    throw new Error('API Error!')
  }

  if(json) {
    const data = await res.json()
    return data.data
  }

}

export const register = (user: any) => {
  return fetcher({url: '/api/register', method:'POST', body: user, json: false})
}

export const signin = (user: any) => {
  return fetcher({url: '/api/signin', method:'POST', body: user, json: false})
}

export const createNewProject = (name) => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: {name},
    json: true
  })
}