/**
 * @generated SignedSource<<3cdbe577c636db27f77d15099ddf57a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistItem_artist$data = {
  readonly href: string | null;
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentType": "PartnerArtistItem_artist";
};
export type PartnerArtistItem_artist$key = {
  readonly " $data"?: PartnerArtistItem_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistItem_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtistItem_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "a7c7f0ed6a2189fa59092da9a63f33ce";

export default node;
