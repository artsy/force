/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnsubscribeLoggedIn_me = {
    readonly id: string;
    readonly emailFrequency: string | null;
    readonly " $refType": "UnsubscribeLoggedIn_me";
};
export type UnsubscribeLoggedIn_me$data = UnsubscribeLoggedIn_me;
export type UnsubscribeLoggedIn_me$key = {
    readonly " $data"?: UnsubscribeLoggedIn_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UnsubscribeLoggedIn_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnsubscribeLoggedIn_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailFrequency",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '07eb2982b4e48f37e5001a6d751b9f88';
export default node;
