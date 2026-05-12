export enum RespondStepName {
  RESPOND = "RESPOND",
  CONFIRMATION = "CONFIRMATION",
}

export enum RespondStepState {
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  HIDDEN = "HIDDEN",
}

export type RespondStep = {
  name: RespondStepName
  state: RespondStepState
}

export type RespondAction = "APPROVE" | "COUNTEROFFER" | "DECLINE"
