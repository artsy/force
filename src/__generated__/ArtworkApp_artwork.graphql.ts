/**
 * @generated SignedSource<<5f93dea774f8fd19df72fb0584dc1ea4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type Visibility = "LISTED" | "UNLISTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly id: string;
    readonly internalID: string;
    readonly slug: string;
  } | null | undefined> | null | undefined;
  readonly attributionClass: {
    readonly internalID: string;
  } | null | undefined;
  readonly availability: string | null | undefined;
  readonly image: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly isAcquireable: boolean | null | undefined;
  readonly isInAuction: boolean | null | undefined;
  readonly isOfferable: boolean | null | undefined;
  readonly isUnlisted: boolean;
  readonly listPrice: {
    readonly display?: string | null | undefined;
  } | null | undefined;
  readonly mediumType: {
    readonly filterGene: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined;
  readonly partner: {
    readonly __typename: "Partner";
  } | null | undefined;
  readonly published: boolean;
  readonly sale: {
    readonly extendedBiddingIntervalMinutes: number | null | undefined;
    readonly internalID: string;
    readonly slug: string;
  } | null | undefined;
  readonly saleMessage: string | null | undefined;
  readonly slug: string;
  readonly visibilityLevel: Visibility | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionCreateAlertHeader_artwork" | "ArtworkDetails_artwork" | "ArtworkImageBrowser_artwork" | "ArtworkMeta_artwork" | "ArtworkPageBanner_artwork" | "ArtworkSidebar_artwork" | "ArtworkTopContextBar_artwork" | "PrivateArtworkDetails_artwork">;
  readonly " $fragmentType": "ArtworkApp_artwork";
};
export type ArtworkApp_artwork$key = {
  readonly " $data"?: ArtworkApp_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "loadSidebar"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkMeta_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkTopContextBar_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
    },
    {
      "condition": "loadSidebar",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkSidebar_artwork"
        }
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkAuctionCreateAlertHeader_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkDetails_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkPageBanner_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetails_artwork"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    (v1/*: any*/),
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "published",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availability",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Gene",
          "kind": "LinkedField",
          "name": "filterGene",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large\")"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibilityLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "listPrice",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "PriceRange",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "Money",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInAuction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extendedBiddingIntervalMinutes",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleMessage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": "artists(shallow:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "6f3e76a129bfb4e52c718141c4706980";

export default node;
