/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsCurrentShow_show = {
    readonly name: string | null;
    readonly href: string | null;
    readonly startAt: string | null;
    readonly endAt: string | null;
    readonly partner: {
        readonly name?: string | null | undefined;
    } | null;
    readonly location: {
        readonly city: string | null;
    } | null;
    readonly artworksConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"GridItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ShowsCurrentShow_show";
};
export type ShowsCurrentShow_show$data = ShowsCurrentShow_show;
export type ShowsCurrentShow_show$key = {
    readonly " $data"?: ShowsCurrentShow_show$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShowsCurrentShow_show">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsCurrentShow_show",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "Partner",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "ExternalPartner",
          "abstractKey": null
        }
      ],
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
          "name": "city",
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
          "value": 15
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
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
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GridItem_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:15)"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();
(node as any).hash = '7ccedb11f973c68631c16d4ba02a567a';
export default node;
