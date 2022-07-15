/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionApp_me = {
    readonly name: string | null;
    readonly " $refType": "MyCollectionApp_me";
};
export type MyCollectionApp_me$data = MyCollectionApp_me;
export type MyCollectionApp_me$key = {
    readonly " $data"?: MyCollectionApp_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'c23b5017938e5dfe4976dc838cfded1d';
export default node;
