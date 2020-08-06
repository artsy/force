/* tslint:disable */

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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AuthenticityCertificateTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"whatevs\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AuthenticityCertificate_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AuthenticityCertificateTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"whatevs\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasCertificateOfAuthenticity",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_biddable",
            "name": "isBiddable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AuthenticityCertificateTestQuery",
    "id": null,
    "text": "query AuthenticityCertificateTestQuery {\n  artwork(id: \"whatevs\") {\n    ...AuthenticityCertificate_artwork\n    id\n  }\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable: isBiddable\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'dad823a90dc192a9c17a406d84cdc0c8';
export default node;
