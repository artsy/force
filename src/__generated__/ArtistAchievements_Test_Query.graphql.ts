/**
 * @generated SignedSource<<292f1984b457adbc5fa88766b32ae6f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAchievements_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistAchievements_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistAchievements_artist">;
  } | null | undefined;
};
export type ArtistAchievements_Test_Query = {
  response: ArtistAchievements_Test_Query$data;
  variables: ArtistAchievements_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "kind": "Literal",
  "name": "isReference",
  "value": true
},
v2 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v3 = {
  "kind": "Literal",
  "name": "visibleToPublic",
  "value": false
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
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
    },
    {
      "kind": "InlineFragment",
      "selections": (v6/*: any*/),
      "type": "ExternalPartner",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v4/*: any*/)
      ],
      "type": "Partner",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v5/*: any*/)
      ],
      "type": "Node",
      "abstractKey": "__isNode"
    }
  ],
  "storageKey": null
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ShowConnection"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ShowEdge"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Show"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerTypes"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAchievements_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistAchievements_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistAchievements_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
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
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "soloShow",
                "value": true
              },
              (v2/*: any*/),
              (v3/*: any*/)
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
                      (v4/*: any*/),
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
                      (v7/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
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
                      (v4/*: any*/),
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
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      (v7/*: any*/),
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
          },
          (v5/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "a0c83f47310706f81328e2406aefa186",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.fairBooths": (v8/*: any*/),
        "artist.fairBooths.edges": (v9/*: any*/),
        "artist.fairBooths.edges.node": (v10/*: any*/),
        "artist.fairBooths.edges.node.exhibitionPeriod": (v11/*: any*/),
        "artist.fairBooths.edges.node.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "artist.fairBooths.edges.node.fair.id": (v12/*: any*/),
        "artist.fairBooths.edges.node.fair.name": (v11/*: any*/),
        "artist.fairBooths.edges.node.id": (v12/*: any*/),
        "artist.fairBooths.edges.node.name": (v11/*: any*/),
        "artist.fairBooths.edges.node.partner": (v13/*: any*/),
        "artist.fairBooths.edges.node.partner.__isNode": (v14/*: any*/),
        "artist.fairBooths.edges.node.partner.__typename": (v14/*: any*/),
        "artist.fairBooths.edges.node.partner.id": (v12/*: any*/),
        "artist.fairBooths.edges.node.partner.name": (v11/*: any*/),
        "artist.href": (v11/*: any*/),
        "artist.id": (v12/*: any*/),
        "artist.insights": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insights.entities": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "artist.insights.kind": {
          "enumValues": [
            "ACTIVE_SECONDARY_MARKET",
            "ARTSY_VANGUARD_YEAR",
            "AWARDS",
            "BIENNIAL",
            "COLLECTED",
            "CRITICALLY_ACCLAIMED",
            "CURATORS_PICK_EMERGING",
            "FOUNDATIONS",
            "GAINING_FOLLOWERS",
            "GROUP_SHOW",
            "HIGH_AUCTION_RECORD",
            "PRIVATE_COLLECTIONS",
            "RECENT_CAREER_EVENT",
            "RESIDENCIES",
            "REVIEWED",
            "SOLO_SHOW",
            "TRENDING_NOW"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtistInsightKind"
        },
        "artist.insights.label": (v14/*: any*/),
        "artist.soloShows": (v8/*: any*/),
        "artist.soloShows.edges": (v9/*: any*/),
        "artist.soloShows.edges.node": (v10/*: any*/),
        "artist.soloShows.edges.node.city": (v11/*: any*/),
        "artist.soloShows.edges.node.id": (v12/*: any*/),
        "artist.soloShows.edges.node.name": (v11/*: any*/),
        "artist.soloShows.edges.node.partner": (v13/*: any*/),
        "artist.soloShows.edges.node.partner.__isNode": (v14/*: any*/),
        "artist.soloShows.edges.node.partner.__typename": (v14/*: any*/),
        "artist.soloShows.edges.node.partner.id": (v12/*: any*/),
        "artist.soloShows.edges.node.partner.name": (v11/*: any*/),
        "artist.soloShows.edges.node.startAt": (v11/*: any*/)
      }
    },
    "name": "ArtistAchievements_Test_Query",
    "operationKind": "query",
    "text": "query ArtistAchievements_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistAchievements_artist\n    id\n  }\n}\n\nfragment ArtistAchievements_artist on Artist {\n  href\n  soloShows: showsConnection(first: 6, sort: START_AT_DESC, atAFair: false, soloShow: true, isReference: true, visibleToPublic: false) {\n    edges {\n      node {\n        name\n        city\n        startAt(format: \"YYYY\")\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  fairBooths: showsConnection(first: 5, sort: START_AT_DESC, atAFair: true, isReference: true, visibleToPublic: false) {\n    edges {\n      node {\n        name\n        exhibitionPeriod(format: SHORT)\n        fair {\n          name\n          id\n        }\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  insights(excludeBlanks: true) {\n    kind\n    label\n    entities\n  }\n}\n"
  }
};
})();

(node as any).hash = "72f596f0095a8b1e8b8bbb2bd9c9548e";

export default node;
