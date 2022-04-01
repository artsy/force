//ABSOLUTELY DO NOT MERGE WITH THIS FILE STILL IN PLACE

import {
  ContextModule as ImportedContextModule,
  AuthContextModule as ImportedAuthContextModule,
} from "@artsy/cohesion"

export const ContextModule = {
  ...ImportedContextModule,
  curatorVisualQuiz: "curatorVisualQuiz",
}

export declare type AuthContextModule = ImportedAuthContextModule & {
  curatorVisualQuiz: "curatorVisualQuiz"
}
