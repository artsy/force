/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairApp_QueryVariables = {
    slug: string;
};
export type FairApp_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
    } | null;
};
export type FairApp_QueryRawResponse = {
    readonly fair: ({
        readonly about: string | null;
        readonly formattedOpeningHours: string | null;
        readonly name: string | null;
        readonly id: string | null;
    }) | null;
};
export type FairApp_Query = {
    readonly response: FairApp_QueryResponse;
    readonly variables: FairApp_QueryVariables;
    readonly rawResponse: FairApp_QueryRawResponse;
};



/*
query FairApp_Query(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairApp_fair
    id
  }
}

fragment FairApp_fair on Fair {
  ...FairHeader_fair
}

fragment FairHeader_fair on Fair {
  about
  formattedOpeningHours
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairApp_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairApp_fair"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FairApp_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "about",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedOpeningHours",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FairApp_Query",
    "operationKind": "query",
    "text": "query FairApp_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairApp_fair\n    id\n  }\n}\n\nfragment FairApp_fair on Fair {\n  ...FairHeader_fair\n}\n\nfragment FairHeader_fair on Fair {\n  about\n  formattedOpeningHours\n  name\n}\n"
  }
};
})();
(node as any).hash = '6ed1d4f2f01fdfc42f25440eb7cc7725';
export default node;
