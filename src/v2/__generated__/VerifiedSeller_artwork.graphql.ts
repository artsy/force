/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VerifiedSeller_artwork = {
    readonly isBiddable: boolean | null;
    readonly partner: {
        readonly isVerifiedSeller: boolean | null;
        readonly name: string | null;
    } | null;
    readonly " $refType": "VerifiedSeller_artwork";
};
export type VerifiedSeller_artwork$data = VerifiedSeller_artwork;
export type VerifiedSeller_artwork$key = {
    readonly " $data"?: VerifiedSeller_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"VerifiedSeller_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VerifiedSeller_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isVerifiedSeller",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'ffc33ea2163d8e4b7821dc20aefb7a4e';
export default node;
