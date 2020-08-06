/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReportQueriesFailureQueryVariables = {
    artworkID: string;
};
export type RequestConditionReportQueriesFailureQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"RequestConditionReport_me">;
    } | null;
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"RequestConditionReport_artwork">;
    } | null;
};
export type RequestConditionReportQueriesFailureQuery = {
    readonly response: RequestConditionReportQueriesFailureQueryResponse;
    readonly variables: RequestConditionReportQueriesFailureQueryVariables;
};



/*
query RequestConditionReportQueriesFailureQuery(
  $artworkID: String!
) {
  me {
    ...RequestConditionReport_me
    id
  }
  artwork(id: $artworkID) {
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
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RequestConditionReportQueriesFailureQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RequestConditionReport_me",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RequestConditionReport_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RequestConditionReportQueriesFailureQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RequestConditionReportQueriesFailureQuery",
    "id": null,
    "text": "query RequestConditionReportQueriesFailureQuery(\n  $artworkID: String!\n) {\n  me {\n    ...RequestConditionReport_me\n    id\n  }\n  artwork(id: $artworkID) {\n    ...RequestConditionReport_artwork\n    id\n  }\n}\n\nfragment RequestConditionReport_artwork on Artwork {\n  internalID\n  slug\n  saleArtwork {\n    internalID\n    id\n  }\n}\n\nfragment RequestConditionReport_me on Me {\n  email\n  internalID\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '809f197d4027e7ec39375f88e6d8eea0';
export default node;
