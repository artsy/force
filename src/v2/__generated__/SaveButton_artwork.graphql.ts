/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SaveButton_artwork = {
    readonly id: string;
    readonly internalID: string;
    readonly slug: string;
    readonly is_saved: boolean | null;
    readonly title: string | null;
    readonly " $refType": "SaveButton_artwork";
};
export type SaveButton_artwork$data = SaveButton_artwork;
export type SaveButton_artwork$key = {
    readonly " $data"?: SaveButton_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"SaveButton_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaveButton_artwork",
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
(node as any).hash = 'e15e9a796560eda039f1abee2994f420';
export default node;
