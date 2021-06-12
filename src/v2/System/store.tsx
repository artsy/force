import { createTypedHooks } from "easy-peasy"
import { createStore } from "easy-peasy"
import { systemModel, SystemModel } from "./SystemModel"

interface StoreModel {
  system: SystemModel
}

export const store = createStore<StoreModel>({
  system: systemModel,
})

export const {
  useStoreActions,
  useStoreDispatch,
  useStoreState,
}: any /* FIXME */ = createTypedHooks<StoreModel>()
