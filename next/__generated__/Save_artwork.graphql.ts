/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Save_artwork = {
    readonly id: string;
    readonly internalID: string;
    readonly slug: string;
    readonly is_saved: boolean | null;
    readonly title: string | null;
    readonly " $refType": "Save_artwork";
};
export type Save_artwork$data = Save_artwork;
export type Save_artwork$key = {
    readonly " $data"?: Save_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"Save_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Save_artwork",
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
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "is_saved",
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = 'beeb9a74a0ff8d75076752d5be66523c';
export default node;
