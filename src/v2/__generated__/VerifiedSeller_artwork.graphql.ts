/* tslint:disable */

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
  "kind": "Fragment",
  "name": "VerifiedSeller_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "is_biddable",
      "name": "isBiddable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "isVerifiedSeller",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '2efbba0f7a6a9470dc169125c7b5fdc9';
export default node;
