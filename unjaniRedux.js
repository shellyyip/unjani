import { createStore } from 'redux'

const POTENTIAL_BODY_LOCATIONS = 
  [
    {
      "ID": 16,
      "Name": "Abdomen, pelvis & buttocks"
    },
    {
      "ID": 7,
      "Name": "Arms & shoulder"
    },
    {
      "ID": 15,
      "Name": "Chest & back"
    },
    {
      "ID": 6,
      "Name": "Head, throat & neck"
    },
    {
      "ID": 10,
      "Name": "Legs"
    },
    {
      "ID": 17,
      "Name": "Skin, joints & general"
    }
  ]

const DEFAULT_MEDICAL_INFO = {
  BODY_LOCATION: {
    potential: POTENTIAL_BODY_LOCATIONS,
    selected: []
  }
}

export const actionTypes = {
  PERSONAL_DATA_CHANGE: 'PERSONAL_DATA_CHANGE'
}

export const stages = {
  PERSONAL_DATA: 'PERSONAL_DATA',
  BODY_LOCATION: 'BODY_LOCATION'
}

const initialState = {
  gender: undefined,
  birthYear: undefined,
  stage: stages.PERSONAL_DATA,
  medicalInfo: DEFAULT_MEDICAL_INFO
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action
  console.log("type is" + type)  
  switch (type) {
    case actionTypes.PERSONAL_DATA_CHANGE: {
      return {
        gender: payload.gender, 
        birthYear: payload.birthYear,
        stage: stages.BODY_LOCATION
      }
    }
  }

  return state
}

export const store = createStore(reducer)
