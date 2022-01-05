/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReportTestQueryVariables = {};
export type RequestConditionReportTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"RequestConditionReport_me">;
    } | null;
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"RequestConditionReport_artwork">;
    } | null;
};
export type RequestConditionReportTestQueryRawResponse = {
    readonly me: ({
        readonly email: string | null;
        readonly internalID: string;
        readonly id: string | null;
    }) | null;
    readonly artwork: ({
        readonly internalID: string;
        readonly slug: string;
        readonly saleArtwork: ({
            readonly internalID: string;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type RequestConditionReportTestQuery = {
    readonly response: RequestConditionReportTestQueryResponse;
    readonly variables: RequestConditionReportTestQueryVariables;
    readonly rawResponse: RequestConditionReportTestQueryRawResponse;
};



/*
query RequestConditionReportTestQuery {
  me {
    ...RequestConditionReport_me
    id
  }
  artwork(id: "artwork-id") {
    ...RequestConditionReport_artwork
    id
  }
}

fragment RequestConditionReport_artwork on Artwork {
  internalID
  slug
  saleArtwork {
    internalID
    id
  }
}

fragment RequestConditionReport_me on Me {
  email
  internalID
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RequestConditionReportTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RequestConditionReport_me"
          }
        ],
        "storageKey": null
      },
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
            "name": "RequestConditionReport_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RequestConditionReportTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v3/*: any*/),
        "artwork.id": (v3/*: any*/),
        "me.email": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.internalID": (v4/*: any*/),
        "artwork.internalID": (v4/*: any*/),
        "artwork.slug": (v4/*: any*/),
        "artwork.saleArtwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.saleArtwork.internalID": (v4/*: any*/),
        "artwork.saleArtwork.id": (v3/*: any*/)
      }
    },
    "name": "RequestConditionReportTestQuery",
    "operationKind": "query",
    "text": "query RequestConditionReportTestQuery {\n  me {\n    ...RequestConditionReport_me\n    id\n  }\n  artwork(id: \"artwork-id\") {\n    ...RequestConditionReport_artwork\n    id\n  }\n}\n\nfragment RequestConditionReport_artwork on Artwork {\n  internalID\n  slug\n  saleArtwork {\n    internalID\n    id\n  }\n}\n\nfragment RequestConditionReport_me on Me {\n  email\n  internalID\n}\n"
  }
};
})();
(node as any).hash = 'a6701f9936f2335fa977525c2765d155';
export default node;
