/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ViewingRoomArtworkDetails_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "additionalInformation",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "artistNames",
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
      "name": "date",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "saleMessage",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '17b59b378f42d4a5091389b5e193ab25';
export default node;
