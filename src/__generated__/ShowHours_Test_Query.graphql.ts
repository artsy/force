/**
 * @generated SignedSource<<6026c2fe8b09e72b82378de52e8be459>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowHours_Test_Query$variables = Record<PropertyKey, never>;
export type ShowHours_Test_Query$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowHours_show">;
  } | null | undefined;
};
export type ShowHours_Test_Query = {
  response: ShowHours_Test_Query$data;
  variables: ShowHours_Test_Query$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "openingHours",
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
            {
              "alias": null,
              "args": null,
              "concreteType": "FormattedDaySchedules",
              "kind": "LinkedField",
              "name": "schedules",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "days",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hours",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "OpeningHoursArray",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "text",
              "storageKey": null
            }
          ],
          "type": "OpeningHoursText",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Location"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "OpeningHoursUnion"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "FormattedDaySchedules"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowHours_Test_Query",
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
            "name": "ShowHours_show"
          }
        ],
        "storageKey": "show(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowHours_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fair",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "show(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "4549037f7266f13a5496fd0b030325d7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "show.fair.id": (v3/*: any*/),
        "show.fair.location": (v4/*: any*/),
        "show.fair.location.id": (v3/*: any*/),
        "show.fair.location.openingHours": (v5/*: any*/),
        "show.fair.location.openingHours.__typename": (v6/*: any*/),
        "show.fair.location.openingHours.schedules": (v7/*: any*/),
        "show.fair.location.openingHours.schedules.days": (v8/*: any*/),
        "show.fair.location.openingHours.schedules.hours": (v8/*: any*/),
        "show.fair.location.openingHours.text": (v8/*: any*/),
        "show.id": (v3/*: any*/),
        "show.location": (v4/*: any*/),
        "show.location.id": (v3/*: any*/),
        "show.location.openingHours": (v5/*: any*/),
        "show.location.openingHours.__typename": (v6/*: any*/),
        "show.location.openingHours.schedules": (v7/*: any*/),
        "show.location.openingHours.schedules.days": (v8/*: any*/),
        "show.location.openingHours.schedules.hours": (v8/*: any*/),
        "show.location.openingHours.text": (v8/*: any*/)
      }
    },
    "name": "ShowHours_Test_Query",
    "operationKind": "query",
    "text": "query ShowHours_Test_Query {\n  show(id: \"example\") {\n    ...ShowHours_show\n    id\n  }\n}\n\nfragment ShowHours_show on Show {\n  location {\n    ...ShowLocationHours_location\n    id\n  }\n  fair {\n    location {\n      ...ShowLocationHours_location\n      id\n    }\n    id\n  }\n}\n\nfragment ShowLocationHours_location on Location {\n  openingHours {\n    __typename\n    ... on OpeningHoursArray {\n      schedules {\n        days\n        hours\n      }\n    }\n    ... on OpeningHoursText {\n      text\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "69600fa090a77b0fe9a14026c701abca";

export default node;
