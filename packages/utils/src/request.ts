export const generalDateProperties = ['date', 'createdAt', 'updatedAt']

export const formatBody = <T>(body: string, dateProps?: string[]): T => {
  const result = JSON.parse(body) as Record<string, unknown>
  const allDateProps = [...generalDateProperties, ...(dateProps || [])]

  for (const dateProp of allDateProps) {
    const value = result[dateProp]

    // valueがstring, number, Dateのいずれかかチェックしてから変換
    if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
      result[dateProp] = new Date(value)
    }
  }

  return result as T
}
