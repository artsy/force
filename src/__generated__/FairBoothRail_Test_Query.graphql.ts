/**
 * @generated SignedSource<<0c59549e46c82d66681a5eaec019e05e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairBoothRail_Test_Query$variables = Record<PropertyKey, never>;
export type FairBoothRail_Test_Query$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"FairBoothRail_show">;
  } | null | undefined;
};
export type FairBoothRail_Test_Query = {
  response: FairBoothRail_Test_Query$data;
  variables: FairBoothRail_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "show-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
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
    "name": "FairBoothRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairBoothRail_show"
          }
        ],
        "storageKey": "show(id:\"show-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairBoothRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
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
            "name": "href",
            "storageKey": null
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
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
                "name": "artworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "show(id:\"show-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "da1a4154ca3cb9994105397159486af6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowCounts"
        },
        "show.counts.artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "show.href": (v3/*: any*/),
        "show.id": (v4/*: any*/),
        "show.internalID": (v4/*: any*/),
        "show.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "show.partner.__isNode": (v5/*: any*/),
        "show.partner.__typename": (v5/*: any*/),
        "show.partner.id": (v4/*: any*/),
        "show.partner.name": (v3/*: any*/),
        "show.slug": (v4/*: any*/)
      }
    },
    "name": "FairBoothRail_Test_Query",
    "operationKind": "query",
    "text": "query FairBoothRail_Test_Query {\n  show(id: \"show-id\") {\n    ...FairBoothRail_show\n    id\n  }\n}\n\nfragment FairBoothRail_show on Show {\n  internalID\n  slug\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  counts {\n    artworks\n  }\n}\n"
  }
};
})();

(node as any).hash = "d1cb58a1341d6fc1865e46a7e94d330d";

export default node;
