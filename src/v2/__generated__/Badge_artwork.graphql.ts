/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Badge_artwork = {
    readonly is_biddable: boolean | null;
    readonly href: string | null;
    readonly sale: {
        readonly is_preview: boolean | null;
        readonly display_timely_at: string | null;
    } | null;
    readonly " $refType": "Badge_artwork";
};
export type Badge_artwork$data = Badge_artwork;
export type Badge_artwork$key = {
    readonly " $data"?: Badge_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"Badge_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Badge_artwork",
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
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": "is_preview",
          "args": null,
          "kind": "ScalarField",
          "name": "isPreview",
          "storageKey": null
        },
        {
          "alias": "display_timely_at",
          "args": null,
          "kind": "ScalarField",
          "name": "displayTimelyAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = 'c56c0d898e4433bfc5acdba932369f3f';
export default node;
