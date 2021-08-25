/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExhibitorsLetterNav_Test_QueryVariables = {};
export type ExhibitorsLetterNav_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"ExhibitorsLetterNav_fair">;
    } | null;
};
export type ExhibitorsLetterNav_Test_Query = {
    readonly response: ExhibitorsLetterNav_Test_QueryResponse;
    readonly variables: ExhibitorsLetterNav_Test_QueryVariables;
};



/*
query ExhibitorsLetterNav_Test_Query {
  fair(id: "one-x-artsy") {
    ...ExhibitorsLetterNav_fair
    id
  }
}

fragment ExhibitorsLetterNav_fair on Fair {
  exhibitorsGroupedByName {
    letter
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "one-x-artsy"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExhibitorsLetterNav_Test_Query",
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
            "name": "ExhibitorsLetterNav_fair"
          }
        ],
        "storageKey": "fair(id:\"one-x-artsy\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExhibitorsLetterNav_Test_Query",
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
            "concreteType": "FairExhibitorsGroup",
            "kind": "LinkedField",
            "name": "exhibitorsGroupedByName",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "letter",
                "storageKey": null
              }
            ],
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
        "storageKey": "fair(id:\"one-x-artsy\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ExhibitorsLetterNav_Test_Query",
    "operationKind": "query",
    "text": "query ExhibitorsLetterNav_Test_Query {\n  fair(id: \"one-x-artsy\") {\n    ...ExhibitorsLetterNav_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n"
  }
};
})();
(node as any).hash = '84d84f3cf1aef8623fba4c87acf7ae29';
export default node;
