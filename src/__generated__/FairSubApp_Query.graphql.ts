/**
 * @generated SignedSource<<e11f44176f75ac0e20a987f71e32cc0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairSubApp_Query$variables = {
  slug: string;
};
export type FairSubApp_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairSubApp_fair">;
  } | null;
};
export type FairSubApp_Query$rawResponse = {
  readonly fair: {
    readonly name: string | null;
    readonly slug: string;
    readonly metaDescription: string | null;
    readonly metaImage: {
      readonly src: string | null;
    } | null;
    readonly id: string;
    readonly profile: {
      readonly __typename: "Profile";
      readonly id: string;
    } | null;
  } | null;
};
export type FairSubApp_Query = {
  variables: FairSubApp_Query$variables;
  response: FairSubApp_Query$data;
  rawResponse: FairSubApp_Query$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
    "type": "Query",
    "abstractKey": null
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
    "cacheID": "19fd33aa842c238e44b218c6b8939b20",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.id": (v3/*: any*/),
        "fair.metaDescription": (v4/*: any*/),
        "fair.metaImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "fair.metaImage.src": (v4/*: any*/),
        "fair.name": (v4/*: any*/),
        "fair.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fair.profile.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "fair.profile.id": (v3/*: any*/),
        "fair.slug": (v3/*: any*/)
      }
    },
    "name": "FairSubApp_Query",
    "operationKind": "query",
    "text": "query FairSubApp_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairSubApp_fair\n    id\n  }\n}\n\nfragment FairMeta_fair on Fair {\n  name\n  slug\n  metaDescription: summary\n  metaImage: image {\n    src: url(version: \"large_rectangle\")\n  }\n}\n\nfragment FairSubApp_fair on Fair {\n  ...FairMeta_fair\n  id\n  name\n  slug\n  profile {\n    __typename\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "cdf533d4f8f6c8aa7902c511a5cd3e9a";

export default node;
