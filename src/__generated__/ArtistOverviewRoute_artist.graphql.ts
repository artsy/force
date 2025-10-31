/**
 * @generated SignedSource<<1d447f49cb5afc70abf6aea930a74cba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist$data = {
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly meta: {
    readonly description: string;
    readonly title: string;
  };
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistOverview_artist">;
  readonly " $fragmentType": "ArtistOverviewRoute_artist";
};
export type ArtistOverviewRoute_artist$key = {
  readonly " $data"?: ArtistOverviewRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistOverviewRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistOverviewRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistOverview_artist"
    },
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
      "name": "slug",
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
      "args": [
        {
          "kind": "Literal",
          "name": "page",
          "value": "ABOUT"
        }
      ],
      "concreteType": "ArtistMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": "meta(page:\"ABOUT\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "f022fe703078477a7745abc38c57e063";

export default node;
