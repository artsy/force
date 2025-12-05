/**
 * @generated SignedSource<<9cf05b5385a266cfcacc47c17415a9ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkHeader_artwork$data = {
  readonly internalID: string;
  readonly isOwnedByCurrentUser: boolean;
  readonly slug: string;
  readonly " $fragmentType": "MyCollectionArtworkHeader_artwork";
};
export type MyCollectionArtworkHeader_artwork$key = {
  readonly " $data"?: MyCollectionArtworkHeader_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkHeader_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkHeader_artwork",
  "selections": [
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
      "alias": "isOwnedByCurrentUser",
      "args": [
        {
          "kind": "Literal",
          "name": "default",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "saves",
          "value": false
        }
      ],
      "kind": "ScalarField",
      "name": "isSavedToList",
      "storageKey": "isSavedToList(default:false,saves:false)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "097aaedbfffdeccfa9f1ede7588195c4";

export default node;
