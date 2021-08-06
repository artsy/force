/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerTiming_Test_QueryVariables = {};
export type FairOrganizerTiming_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairOrganizerTiming_fair">;
    } | null;
};
export type FairOrganizerTiming_Test_Query = {
    readonly response: FairOrganizerTiming_Test_QueryResponse;
    readonly variables: FairOrganizerTiming_Test_QueryVariables;
};



/*
query FairOrganizerTiming_Test_Query {
  fair(id: "example") {
    ...FairOrganizerTiming_fair
    id
  }
}

fragment FairOrganizerTiming_fair on Fair {
  startAt
  exhibitionPeriod
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerTiming_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerTiming_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOrganizerTiming_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "exhibitionPeriod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairOrganizerTiming_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerTiming_Test_Query {\n  fair(id: \"example\") {\n    ...FairOrganizerTiming_fair\n    id\n  }\n}\n\nfragment FairOrganizerTiming_fair on Fair {\n  startAt\n  exhibitionPeriod\n}\n"
  }
};
})();
(node as any).hash = '9d1d4514d5c2704f3fea2e6ae0e47f07';
export default node;
