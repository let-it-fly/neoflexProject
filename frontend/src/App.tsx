import { useState, type FormEvent } from 'react'
import { calculate, type CalculateResponse } from './api'

interface FormErrors {
  amount?: string
  months?: string
  rate?: string
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

function App() {
  const [amount, setAmount] = useState('100000')
  const [months, setMonths] = useState('12')
  const [rate, setRate] = useState('8.5')
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [result, setResult] = useState<CalculateResponse | null>(null)

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    const amountNum = Number(amount)
    const monthsNum = Number(months)
    const rateNum = Number(rate)

    if (!amount || Number.isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = 'Сумма должна быть числом больше 0'
    }
    if (!months || Number.isNaN(monthsNum) || monthsNum <= 0) {
      newErrors.months = 'Срок должен быть числом больше 0'
    }
    if (!rate || Number.isNaN(rateNum) || rateNum <= 0) {
      newErrors.rate = 'Ставка должна быть числом больше 0'
    }

    return newErrors
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setApiError(null)
    setResult(null)

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)
    try {
      const response = await calculate({
        amount: Number(amount),
        months: Number(months),
        rate: Number(rate),
      })
      setResult(response)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Не удалось выполнить запрос')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <div className="card">
        <h1 className="title">Калькулятор вклада</h1>

        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="field">
            <label htmlFor="amount">Сумма вклада</label>
            <div className="input-wrap">
              <input
                id="amount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-invalid={Boolean(errors.amount)}
              />
              <span className="suffix">₽</span>
            </div>
            {errors.amount && <span className="error">{errors.amount}</span>}
          </div>

          <div className="field">
            <label htmlFor="months">Срок (месяцы)</label>
            <div className="input-wrap">
              <input
                id="months"
                type="number"
                min="1"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                aria-invalid={Boolean(errors.months)}
              />
            </div>
            {errors.months && <span className="error">{errors.months}</span>}
          </div>

          <div className="field">
            <label htmlFor="rate">Годовая ставка</label>
            <div className="input-wrap">
              <input
                id="rate"
                type="number"
                min="1"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                aria-invalid={Boolean(errors.rate)}
              />
              <span className="suffix">%</span>
            </div>
            {errors.rate && <span className="error">{errors.rate}</span>}
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Расчёт…' : 'Рассчитать'}
          </button>
        </form>

        {apiError && <div className="api-error">{apiError}</div>}

        {result && (
          <div className="result">
            <div className="result-row">
              <span>Начальная сумма:</span>
              <strong>{formatCurrency(Number(amount))}</strong>
            </div>
            <div className="result-row">
              <span>Итоговая сумма:</span>
              <strong>{formatCurrency(result.total)}</strong>
            </div>
            <div className="result-row">
              <span>Доход:</span>
              <strong className="profit">{formatCurrency(result.profit)}</strong>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
