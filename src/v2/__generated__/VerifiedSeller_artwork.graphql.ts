/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VerifiedSeller_artwork = {
    readonly is_biddable: boolean | null;
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
      "alias": "is_biddable",
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
  "type": "Artwork"
};
(node as any).hash = '2efbba0f7a6a9470dc169125c7b5fdc9';
export default node;
