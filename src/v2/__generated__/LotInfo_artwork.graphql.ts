/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LotInfo_artwork = {
    readonly internalID: string;
    readonly date: string | null;
    readonly title: string | null;
    readonly imageUrl: string | null;
    readonly artistNames: string | null;
    readonly " $refType": "LotInfo_artwork";
};
export type LotInfo_artwork$data = LotInfo_artwork;
export type LotInfo_artwork$key = {
    readonly " $data"?: LotInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"LotInfo_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "LotInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "imageUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "artistNames",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'b97e574bb5ba20c56fcba68e82f78ffb';
export default node;
