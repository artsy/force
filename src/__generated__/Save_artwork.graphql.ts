/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Save_artwork = {
    readonly __id: string;
    readonly id: string;
    readonly is_saved: boolean | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Save_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_saved",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '0faa5a4a653d49f5187e7c576b95cba7';
export default node;
