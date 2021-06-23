/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeArtworkModuleContext_context = {
    readonly __typename: "Sale";
    readonly href: string | null;
    readonly liveStartAt: string | null;
    readonly startAt: string | null;
    readonly endAt: string | null;
    readonly " $refType": "HomeArtworkModuleContext_context";
} | {
    readonly __typename: "Fair";
    readonly href: string | null;
    readonly exhibitionPeriod: string | null;
    readonly " $refType": "HomeArtworkModuleContext_context";
} | {
    readonly __typename: "Gene";
    readonly href: string | null;
    readonly " $refType": "HomeArtworkModuleContext_context";
} | {
    readonly __typename: "HomePageRelatedArtistArtworkModule";
    readonly artist: {
        readonly name: string | null;
        readonly href: string | null;
    } | null;
    readonly basedOn: {
        readonly name: string | null;
        readonly href: string | null;
    } | null;
    readonly " $refType": "HomeArtworkModuleContext_context";
} | {
    readonly __typename: "HomePageFollowedArtistArtworkModule";
    readonly artist: {
        readonly href: string | null;
    } | null;
    readonly " $refType": "HomeArtworkModuleContext_context";
} | {
    readonly __typename: "TrendingArtists";
    readonly artists: ReadonlyArray<{
        readonly href: string | null;
        readonly name: string | null;
    } | null> | null;
    readonly " $refType": "HomeArtworkModuleContext_context";
} | {
    readonly __typename: "FollowArtists";
    readonly artists: ReadonlyArray<{
        readonly href: string | null;
        readonly name: string | null;
    } | null> | null;
    readonly " $refType": "HomeArtworkModuleContext_context";
} | {
    /*This will never be '%other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
    readonly " $refType": "HomeArtworkModuleContext_context";
};
export type HomeArtworkModuleContext_context$data = HomeArtworkModuleContext_context;
export type HomeArtworkModuleContext_context$key = {
    readonly " $data"?: HomeArtworkModuleContext_context$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeArtworkModuleContext_context">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v2 = [
  (v0/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  (v0/*: any*/)
],
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Artist",
    "kind": "LinkedField",
    "name": "artists",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeArtworkModuleContext_context",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": (v1/*: any*/),
          "kind": "ScalarField",
          "name": "liveStartAt",
          "storageKey": "liveStartAt(format:\"MMM D\")"
        },
        {
          "alias": null,
          "args": (v1/*: any*/),
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": "startAt(format:\"MMM D\")"
        },
        {
          "alias": null,
          "args": (v1/*: any*/),
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": "endAt(format:\"MMM D\")"
        }
      ],
      "type": "Sale"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "exhibitionPeriod",
          "storageKey": null
        }
      ],
      "type": "Fair"
    },
    {
      "kind": "InlineFragment",
      "selections": (v2/*: any*/),
      "type": "Gene"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artist",
          "kind": "LinkedField",
          "name": "artist",
          "plural": false,
          "selections": (v4/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Artist",
          "kind": "LinkedField",
          "name": "basedOn",
          "plural": false,
          "selections": (v4/*: any*/),
          "storageKey": null
        }
      ],
      "type": "HomePageRelatedArtistArtworkModule"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artist",
          "kind": "LinkedField",
          "name": "artist",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "type": "HomePageFollowedArtistArtworkModule"
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "TrendingArtists"
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "FollowArtists"
    }
  ],
  "type": "HomePageArtworkModuleContext"
};
})();
(node as any).hash = 'aaf7af84cacea3d163e3d9309d4f2d48';
export default node;
