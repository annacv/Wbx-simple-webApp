export const checkStatus = (value) => {
  if (value === 20) {
    value = 'charging'
  } else if (value === 10 || value === 11) {
    value = 'ready'
  } else {
    value = 'error'
  }
  return value
}

export const formatDate = (date) => {
  date = new Date(date).toDateString().substring(3)
  return date
}

export const getTime = (timestamp) => {
  if (timestamp) {
    let hours = new Date(timestamp).getHours()
    let minutes = new Date(timestamp).getMinutes()
    minutes = minutes === 0 ? '' : `${minutes}m`
    return `${hours}h ${minutes}`
  }
}