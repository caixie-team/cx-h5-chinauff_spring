import processTypes from './types'

const processField = (field) => {
  const _field = {
    ...field
  }
  processTypes(_field)
  return _field
}

export {processField}
