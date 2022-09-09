/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NewForYouArtworksGrid_viewer = {
    readonly artworksForUser: {
        readonly totalCount: number | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
    } | null;
    readonly " $refType": "NewForYouArtworksGrid_viewer";
};
export type NewForYouArtworksGrid_viewer$data = NewForYouArtworksGrid_viewer;
export type NewForYouArtworksGrid_viewer$key = {
    readonly " $data"?: NewForYouArtworksGrid_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NewForYouArtworksGrid_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeBackfill"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "maxWorksPerArtist"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "version"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewForYouArtworksGrid_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "includeBackfill",
          "variableName": "includeBackfill"
        },
        {
          "kind": "Variable",
          "name": "maxWorksPerArtist",
          "variableName": "maxWorksPerArtist"
        },
        {
          "kind": "Variable",
          "name": "version",
          "variableName": "version"
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksForUser",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'cbae1f0c92730af09b6a42016a53d692';
export default node;
