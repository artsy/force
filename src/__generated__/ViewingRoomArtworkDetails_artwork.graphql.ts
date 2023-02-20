/**
 * @generated SignedSource<<ea5bf2603d23704fc7e08414c712b94c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomArtworkDetails_artwork$data = {
  readonly additionalInformation: string | null;
  readonly href: string | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"Details_artwork">;
  readonly " $fragmentType": "ViewingRoomArtworkDetails_artwork";
};
export type ViewingRoomArtworkDetails_artwork$key = {
  readonly " $data"?: ViewingRoomArtworkDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomArtworkDetails_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomArtworkDetails_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Details_artwork"
    },
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
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "591548577ce680c3c23e8c4c03f59f29";

export default node;
