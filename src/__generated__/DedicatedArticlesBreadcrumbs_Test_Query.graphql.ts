/**
 * @generated SignedSource<<348c91bccefe710c3778e4a03d1758d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DedicatedArticlesBreadcrumbs_Test_Query$variables = Record<PropertyKey, never>;
export type DedicatedArticlesBreadcrumbs_Test_Query$data = {
  readonly fairOrganizer: {
    readonly " $fragmentSpreads": FragmentRefs<"DedicatedArticlesBreadcrumbs_fairOrganizer">;
  } | null | undefined;
};
export type DedicatedArticlesBreadcrumbs_Test_Query = {
  response: DedicatedArticlesBreadcrumbs_Test_Query$data;
  variables: DedicatedArticlesBreadcrumbs_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DedicatedArticlesBreadcrumbs_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DedicatedArticlesBreadcrumbs_fairOrganizer"
          }
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DedicatedArticlesBreadcrumbs_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "97c86dcd89f2399867b589680d719f74",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fairOrganizer.id": (v2/*: any*/),
        "fairOrganizer.name": (v3/*: any*/),
        "fairOrganizer.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fairOrganizer.profile.id": (v2/*: any*/),
        "fairOrganizer.profile.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "fairOrganizer.profile.image.url": (v3/*: any*/),
        "fairOrganizer.slug": (v2/*: any*/)
      }
    },
    "name": "DedicatedArticlesBreadcrumbs_Test_Query",
    "operationKind": "query",
    "text": "query DedicatedArticlesBreadcrumbs_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...DedicatedArticlesBreadcrumbs_fairOrganizer\n    id\n  }\n}\n\nfragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    image {\n      url\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "afa30fa8497e508d19f3bc05ee3a7a75";

export default node;
