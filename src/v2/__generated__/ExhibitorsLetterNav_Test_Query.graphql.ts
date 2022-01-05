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
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.exhibitorsGroupedByName": {
          "type": "FairExhibitorsGroup",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "fair.exhibitorsGroupedByName.letter": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "ExhibitorsLetterNav_Test_Query",
    "operationKind": "query",
    "text": "query ExhibitorsLetterNav_Test_Query {\n  fair(id: \"one-x-artsy\") {\n    ...ExhibitorsLetterNav_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n"
  }
};
})();
(node as any).hash = '5e0b9b030a6a6f5eff7caf3985e38350';
export default node;
