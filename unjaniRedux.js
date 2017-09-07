export const actionTypes = {
  PERSONAL_DATA_CHANGE: 'PERSONAL_DATA_CHANGE'
}

const initialState = {
  gender: undefined,
  birthYear: undefined
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action
  
  switch (type) {
    case types.PERSONAL_DATA_CHANGE: {
      return {
        gender: payload.gender, 
        birthYear: payload.birthYear
      }
    }
  }

  return state
}

