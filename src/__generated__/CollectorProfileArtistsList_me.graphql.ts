/**
 * @generated SignedSource<<bb2cd33d02edae95c7a32be8c71b2d73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileArtistsList_me$data = {
  readonly userInterestsConnection: {
    readonly edges: ReadonlyArray<{
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsListArtist_userInterestEdge">;
    } | null | undefined> | null | undefined;
    readonly pageCursors: {
      readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
    };
    readonly pageInfo: {
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "CollectorProfileArtistsList_me";
};
export type CollectorProfileArtistsList_me$key = {
  readonly " $data"?: CollectorProfileArtistsList_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsList_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "size"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileArtistsList_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "interestType",
          "value": "ARTIST"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Variable",
          "name": "size",
          "variableName": "size"
        }
      ],
      "concreteType": "UserInterestConnection",
      "kind": "LinkedField",
      "name": "userInterestsConnection",
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
          "concreteType": "PageCursors",
          "kind": "LinkedField",
          "name": "pageCursors",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors"
            }
          ],
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
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserInterestEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CollectorProfileArtistsListArtist_userInterestEdge"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "563357de816a4538cad1461fe7139634";

export default node;
