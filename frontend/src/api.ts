export interface CalculateRequest {
  amount: number
  months: number
  rate: number
}

export interface CalculateResponse {
  total: number
  profit: number
}

export async function calculate(request: CalculateRequest): Promise<CalculateResponse> {
  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`)
  }

  return (await response.json()) as CalculateResponse
}
