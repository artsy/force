/**
 * @generated SignedSource<<84186627ec847c25019508e1eeb39521>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowApp_show$data = {
  readonly about: string | null | undefined;
  readonly counts: {
    readonly eligibleArtworks: any | null | undefined;
  } | null | undefined;
  readonly fair: {
    readonly hasFullFeature: boolean | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly images: ReadonlyArray<{
    readonly url: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly internalID: string;
  readonly isFairBooth: boolean | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly viewingRoomsConnection: {
    readonly edges: ReadonlyArray<{
      readonly __typename: "ViewingRoomsEdge";
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"BackToFairBanner_show" | "ShowAbout_show" | "ShowArtworksEmptyState_show" | "ShowContextCard_show" | "ShowHeader_show" | "ShowInstallShots_show" | "ShowMeta_show" | "ShowStructuredData_show" | "ShowViewingRoom_show">;
  readonly " $fragmentType": "ShowApp_show";
};
export type ShowApp_show$key = {
  readonly " $data"?: ShowApp_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowApp_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowApp_show",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BackToFairBanner_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowAbout_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowArtworksEmptyState_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowContextCard_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowHeader_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowInstallShots_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowMeta_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowStructuredData_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowViewingRoom_show"
    },
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
      "name": "href",
      "storageKey": null
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
      "alias": "about",
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFairBooth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ViewingRoomsConnection",
      "kind": "LinkedField",
      "name": "viewingRoomsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ViewingRoomsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ShowCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eligibleArtworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fair",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasFullFeature",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "default",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 100
        }
      ],
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": "images(default:false,size:100)"
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "8d46c026ca07202cb2f89f7ae403aa8d";

export default node;
