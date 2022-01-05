/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairSubApp_QueryVariables = {
    slug: string;
};
export type FairSubApp_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairSubApp_fair">;
    } | null;
};
export type FairSubApp_QueryRawResponse = {
    readonly fair: ({
        readonly name: string | null;
        readonly slug: string;
        readonly metaDescription: string | null;
        readonly metaImage: ({
            readonly src: string | null;
        }) | null;
        readonly id: string;
        readonly profile: ({
            readonly __typename: "Profile";
            readonly id: string | null;
        }) | null;
    }) | null;
};
export type FairSubApp_Query = {
    readonly response: FairSubApp_QueryResponse;
    readonly variables: FairSubApp_QueryVariables;
    readonly rawResponse: FairSubApp_QueryRawResponse;
};



/*
query FairSubApp_Query(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairSubApp_fair
    id
  }
}

fragment FairMeta_fair on Fair {
  name
  slug
  metaDescription: summary
  metaImage: image {
    src: url(version: "large_rectangle")
  }
}

fragment FairSubApp_fair on Fair {
  ...FairMeta_fair
  id
  name
  slug
  profile {
    __typename
    id
  }
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
],
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
  "nullable": false
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairSubApp_Query",
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
            "name": "FairSubApp_fair"
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
    "name": "FairSubApp_Query",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "metaDescription",
            "args": null,
            "kind": "ScalarField",
            "name": "summary",
            "storageKey": null
          },
          {
            "alias": "metaImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "src",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large_rectangle"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large_rectangle\")"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
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
        "fair.id": (v3/*: any*/),
        "fair.name": (v4/*: any*/),
        "fair.slug": (v3/*: any*/),
        "fair.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.metaDescription": (v4/*: any*/),
        "fair.metaImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.profile.__typename": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fair.profile.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fair.metaImage.src": (v4/*: any*/)
      }
    },
    "name": "FairSubApp_Query",
    "operationKind": "query",
    "text": "query FairSubApp_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairSubApp_fair\n    id\n  }\n}\n\nfragment FairMeta_fair on Fair {\n  name\n  slug\n  metaDescription: summary\n  metaImage: image {\n    src: url(version: \"large_rectangle\")\n  }\n}\n\nfragment FairSubApp_fair on Fair {\n  ...FairMeta_fair\n  id\n  name\n  slug\n  profile {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cdf533d4f8f6c8aa7902c511a5cd3e9a';
export default node;
