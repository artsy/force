/* tslint:disable */

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
  "kind": "Fragment",
  "name": "Badge_artwork",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_preview",
          "name": "isPreview",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "display_timely_at",
          "name": "displayTimelyAt",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'c56c0d898e4433bfc5acdba932369f3f';
export default node;
