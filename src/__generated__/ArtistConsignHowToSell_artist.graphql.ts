/**
 * @generated SignedSource<<51ca676e20bf0765627d408e436f8096>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignHowToSell_artist$data = {
  readonly href: string | null | undefined;
  readonly " $fragmentType": "ArtistConsignHowToSell_artist";
};
export type ArtistConsignHowToSell_artist$key = {
  readonly " $data"?: ArtistConsignHowToSell_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignHowToSell_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignHowToSell_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "4c7974a321e83d875e6ce77d5ea43b66";

export default node;
