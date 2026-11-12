/**
 * @generated SignedSource<<af1e7def2e1fb0547c3dc27147210ff5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistInsightKind = "ACTIVE_SECONDARY_MARKET" | "ARTSY_VANGUARD_YEAR" | "AWARDS" | "BIENNIAL" | "COLLECTED" | "CRITICALLY_ACCLAIMED" | "CURATORS_PICK_EMERGING" | "FOUNDATIONS" | "GAINING_FOLLOWERS" | "GROUP_SHOW" | "HIGH_AUCTION_RECORD" | "PRIVATE_COLLECTIONS" | "RECENT_CAREER_EVENT" | "RESIDENCIES" | "REVIEWED" | "SOLO_SHOW" | "TRENDING_NOW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistAchievements_artist$data = {
  readonly fairBooths: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly exhibitionPeriod: string | null | undefined;
        readonly fair: {
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly name: string | null | undefined;
        readonly partner: {
          readonly name?: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly insights: ReadonlyArray<{
    readonly entities: ReadonlyArray<string>;
    readonly kind: ArtistInsightKind | null | undefined;
    readonly label: string;
  }>;
  readonly soloShows: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly city: string | null | undefined;
        readonly name: string | null | undefined;
        readonly partner: {
          readonly name?: string | null | undefined;
        } | null | undefined;
        readonly startAt: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistAchievements_artist";
};
export type ArtistAchievements_artist$key = {
  readonly " $data"?: ArtistAchievements_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAchievements_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "isReference",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v2 = {
  "kind": "Literal",
  "name": "visibleToPublic",
  "value": false
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v4/*: any*/),
      "type": "ExternalPartner",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v4/*: any*/),
      "type": "Partner",
      "abstractKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAchievements_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": "soloShows",
      "args": [
        {
          "kind": "Literal",
          "name": "atAFair",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        },
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "soloShow",
          "value": true
        },
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
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
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "city",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "startAt",
                  "storageKey": "startAt(format:\"YYYY\")"
                },
                (v5/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "showsConnection(atAFair:false,first:6,isReference:true,soloShow:true,sort:\"START_AT_DESC\",visibleToPublic:false)"
    },
    {
      "alias": "fairBooths",
      "args": [
        {
          "kind": "Literal",
          "name": "atAFair",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        },
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
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
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "SHORT"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "exhibitionPeriod",
                  "storageKey": "exhibitionPeriod(format:\"SHORT\")"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Fair",
                  "kind": "LinkedField",
                  "name": "fair",
                  "plural": false,
                  "selections": (v4/*: any*/),
                  "storageKey": null
                },
                (v5/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "showsConnection(atAFair:true,first:5,isReference:true,sort:\"START_AT_DESC\",visibleToPublic:false)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "excludeBlanks",
          "value": true
        }
      ],
      "concreteType": "ArtistInsight",
      "kind": "LinkedField",
      "name": "insights",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "kind",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "label",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "entities",
          "storageKey": null
        }
      ],
      "storageKey": "insights(excludeBlanks:true)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "bdec351eafdf5d5fd4f66e9b8c129673";

export default node;
