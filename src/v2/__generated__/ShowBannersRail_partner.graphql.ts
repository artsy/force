/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowBannersRail_partner = {
    readonly slug: string;
    readonly featuredShow: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ShowBannersMobileCarousel_shows" | "ShowBannersDesktopCarousel_shows">;
            } | null;
        } | null> | null;
    } | null;
    readonly currentShows: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ShowBannersMobileCarousel_shows" | "ShowBannersDesktopCarousel_shows">;
            } | null;
        } | null> | null;
    } | null;
    readonly upcomingShows: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ShowBannersMobileCarousel_shows" | "ShowBannersDesktopCarousel_shows">;
            } | null;
        } | null> | null;
    } | null;
    readonly pastShows: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ShowBannersMobileCarousel_shows" | "ShowBannersDesktopCarousel_shows">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ShowBannersRail_partner";
};
export type ShowBannersRail_partner$data = ShowBannersRail_partner;
export type ShowBannersRail_partner$key = {
    readonly " $data"?: ShowBannersRail_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowBannersRail_partner">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "isDisplayable",
  "value": true
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ShowEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowBannersMobileCarousel_shows"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowBannersDesktopCarousel_shows"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowBannersRail_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "featuredShow",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "FEATURED_DESC_END_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "ALL"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "showsConnection(first:1,isDisplayable:true,sort:\"FEATURED_DESC_END_AT_DESC\",status:\"ALL\")"
    },
    {
      "alias": "currentShows",
      "args": [
        (v2/*: any*/),
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "CURRENT"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "showsConnection(first:10,isDisplayable:true,sort:\"END_AT_ASC\",status:\"CURRENT\")"
    },
    {
      "alias": "upcomingShows",
      "args": [
        (v2/*: any*/),
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "UPCOMING"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "showsConnection(first:10,isDisplayable:true,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
    },
    {
      "alias": "pastShows",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 2
        },
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "CLOSED"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "showsConnection(first:2,isDisplayable:true,sort:\"END_AT_DESC\",status:\"CLOSED\")"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
})();
(node as any).hash = '6a233f2c2f99e642d7abd91071dd463b';
export default node;
