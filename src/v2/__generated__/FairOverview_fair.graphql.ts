/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOverview_fair = {
    readonly endAt: string | null;
    readonly href: string | null;
    readonly about: string | null;
    readonly slug: string;
    readonly tagline: string | null;
    readonly location: {
        readonly summary: string | null;
    } | null;
    readonly articlesConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly __typename: string;
        } | null> | null;
    } | null;
    readonly marketingCollections: ReadonlyArray<{
        readonly id: string;
    } | null>;
    readonly ticketsLink: string | null;
    readonly hours: string | null;
    readonly links: string | null;
    readonly tickets: string | null;
    readonly summary: string | null;
    readonly contact: string | null;
    readonly " $fragmentRefs": FragmentRefs<"FairEditorial_fair" | "FairCollections_fair" | "FairFollowedArtists_fair">;
    readonly " $refType": "FairOverview_fair";
};
export type FairOverview_fair$data = FairOverview_fair;
export type FairOverview_fair$key = {
    readonly " $data"?: FairOverview_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOverview_fair">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOverview_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
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
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"HTML\")"
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
      "name": "tagline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "summary",
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
          "name": "first",
          "value": 6
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
        }
      ],
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
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
          "concreteType": "ArticleEdge",
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
      "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 5
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": "marketingCollections(size:5)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ticketsLink",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "hours",
      "storageKey": "hours(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "links",
      "storageKey": "links(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "tickets",
      "storageKey": "tickets(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": "summary(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "contact",
      "storageKey": "contact(format:\"HTML\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairEditorial_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairCollections_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairFollowedArtists_fair"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = 'ae03c5f35371c8a2a70fdd03f581b7a3';
export default node;
