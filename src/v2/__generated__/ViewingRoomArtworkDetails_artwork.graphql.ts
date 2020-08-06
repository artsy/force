/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomArtworkDetails_artwork = {
    readonly id: string;
    readonly additionalInformation: string | null;
    readonly artistNames: string | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly href: string | null;
    readonly saleMessage: string | null;
    readonly " $refType": "ViewingRoomArtworkDetails_artwork";
};
export type ViewingRoomArtworkDetails_artwork$data = ViewingRoomArtworkDetails_artwork;
export type ViewingRoomArtworkDetails_artwork$key = {
    readonly " $data"?: ViewingRoomArtworkDetails_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomArtworkDetails_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomArtworkDetails_artwork",
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
      "name": "additionalInformation",
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
      "name": "title",
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleMessage",
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '17b59b378f42d4a5091389b5e193ab25';
export default node;
