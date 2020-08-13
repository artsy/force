/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuthenticityCertificateTestQueryVariables = {};
export type AuthenticityCertificateTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"AuthenticityCertificate_artwork">;
    } | null;
};
export type AuthenticityCertificateTestQueryRawResponse = {
    readonly artwork: ({
        readonly hasCertificateOfAuthenticity: boolean | null;
        readonly is_biddable: boolean | null;
        readonly id: string | null;
    }) | null;
};
export type AuthenticityCertificateTestQuery = {
    readonly response: AuthenticityCertificateTestQueryResponse;
    readonly variables: AuthenticityCertificateTestQueryVariables;
    readonly rawResponse: AuthenticityCertificateTestQueryRawResponse;
};



/*
query AuthenticityCertificateTestQuery {
  artwork(id: "whatevs") {
    ...AuthenticityCertificate_artwork
    id
  }
}

fragment AuthenticityCertificate_artwork on Artwork {
  hasCertificateOfAuthenticity
  is_biddable: isBiddable
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "whatevs"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthenticityCertificateTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuthenticityCertificate_artwork"
          }
        ],
        "storageKey": "artwork(id:\"whatevs\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthenticityCertificateTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCertificateOfAuthenticity",
            "storageKey": null
          },
          {
            "alias": "is_biddable",
            "args": null,
            "kind": "ScalarField",
            "name": "isBiddable",
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
        "storageKey": "artwork(id:\"whatevs\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AuthenticityCertificateTestQuery",
    "operationKind": "query",
    "text": "query AuthenticityCertificateTestQuery {\n  artwork(id: \"whatevs\") {\n    ...AuthenticityCertificate_artwork\n    id\n  }\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable: isBiddable\n}\n"
  }
};
})();
(node as any).hash = 'dad823a90dc192a9c17a406d84cdc0c8';
export default node;
