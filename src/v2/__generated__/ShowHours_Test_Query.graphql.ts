/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowHours_Test_QueryVariables = {};
export type ShowHours_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowHours_show">;
    } | null;
};
export type ShowHours_Test_Query = {
    readonly response: ShowHours_Test_QueryResponse;
    readonly variables: ShowHours_Test_QueryVariables;
};



/*
query ShowHours_Test_Query {
  show(id: "example") {
    ...ShowHours_show
    id
  }
}

fragment ShowHours_show on Show {
  location {
    ...ShowLocationHours_location
    id
  }
  fair {
    location {
      ...ShowLocationHours_location
      id
    }
    id
  }
}

fragment ShowLocationHours_location on Location {
  openingHours {
    __typename
    ... on OpeningHoursArray {
      schedules {
        days
        hours
      }
    }
    ... on OpeningHoursText {
      text
    }
  }
}
*/

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
          "type": "OpeningHoursArray"
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
          "type": "OpeningHoursText"
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "storageKey": null
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "ShowHours_Test_Query",
    "operationKind": "query",
    "text": "query ShowHours_Test_Query {\n  show(id: \"example\") {\n    ...ShowHours_show\n    id\n  }\n}\n\nfragment ShowHours_show on Show {\n  location {\n    ...ShowLocationHours_location\n    id\n  }\n  fair {\n    location {\n      ...ShowLocationHours_location\n      id\n    }\n    id\n  }\n}\n\nfragment ShowLocationHours_location on Location {\n  openingHours {\n    __typename\n    ... on OpeningHoursArray {\n      schedules {\n        days\n        hours\n      }\n    }\n    ... on OpeningHoursText {\n      text\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1d21617fc41a3c15cee5482a3affe8f6';
export default node;
