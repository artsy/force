/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LotInfo_artwork = {
    readonly internalID: string;
    readonly date: string | null;
    readonly title: string | null;
    readonly imageUrl: string | null;
    readonly artistNames: string | null;
    readonly slug: string;
    readonly " $refType": "LotInfo_artwork";
};
export type LotInfo_artwork$data = LotInfo_artwork;
export type LotInfo_artwork$key = {
    readonly " $data"?: LotInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"LotInfo_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LotInfo_artwork",
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
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '8282283c0a119d9ce6e05a8b03e648c4';
export default node;
