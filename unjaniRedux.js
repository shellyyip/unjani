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
  PERSONAL_DATA_CHANGE: 'PERSONAL_DATA_CHANGE',
  OPTIONS_SUBMITTED: 'OPTIONS_SUBMITTED',
  REQUEST_COMPLETED: 'REQUEST_COMPLETED'
}

export const stages = {
  PERSONAL_DATA: 'PERSONAL_DATA',
  BODY_LOCATION: 'BODY_LOCATION',
  BODY_SUBLOCATION: 'BODY_SUBLOCATION',
  SUBLOCATION_SYMPTOMS: 'SUBLOCATION_SYMPTOMS'
}

const stagesKeys = ['PERSONAL_DATA', 'BODY_LOCATION', 'BODY_SUBLOCATION', 'SUBLOCATION_SYMPTOMS']

const initialState = {
  gender: undefined,
  birthYear: undefined,
  isFetching: false,
  stage: stages.PERSONAL_DATA,
  medicalInfo: DEFAULT_MEDICAL_INFO
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case actionTypes.PERSONAL_DATA_CHANGE: {
      return {
        ...state,
        gender: payload.gender, 
        birthYear: payload.birthYear,
        stage: stages.BODY_LOCATION
      }
    }
    case actionTypes.OPTIONS_SUBMITTED: {
      const medicalInfo = state.medicalInfo;
      medicalInfo[state.stage].selected = payload.selected;
      return {
        ...state,
        isFetching: true,
        medicalInfo: medicalInfo
      }
    }
    case actionTypes.REQUEST_COMPLETED: {
      const medicalInfo = state.medicalInfo;
      const nextStageIndex = (stagesKeys.indexOf(state.stage) + 1)
      const nextStage = stagesKeys[nextStageIndex]
      medicalInfo[nextStage] = { potential: payload.potential, selected: [] }
      return {
        ...state,
        isFetching: false,
        stage: nextStage, 
        medicalInfo: medicalInfo
      }
    }
  }

  return state
}

export const store = createStore(reducer)
