/**
 * @generated SignedSource<<93c4ae0ad7b0af0db74fec53226ef91a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityHeaderFairFragmentContainer_Test_Query$variables = Record<PropertyKey, never>;
export type EntityHeaderFairFragmentContainer_Test_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderFair_fair">;
  } | null | undefined;
};
export type EntityHeaderFairFragmentContainer_Test_Query = {
  response: EntityHeaderFairFragmentContainer_Test_Query$data;
  variables: EntityHeaderFairFragmentContainer_Test_Query$variables;
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EntityHeaderFairFragmentContainer_Test_Query",
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
            "name": "EntityHeaderFair_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EntityHeaderFairFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
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
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM Do"
              }
            ],
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": "startAt(format:\"MMM Do\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM Do YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": "endAt(format:\"MMM Do YYYY\")"
          },
          {
            "alias": "avatar",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 45
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 45
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:45,width:45)"
              }
            ],
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "373915fac8d40076f3156e87d4274638",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.avatar": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "fair.avatar.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "fair.avatar.cropped.src": (v3/*: any*/),
        "fair.avatar.cropped.srcSet": (v3/*: any*/),
        "fair.endAt": (v4/*: any*/),
        "fair.href": (v4/*: any*/),
        "fair.id": (v5/*: any*/),
        "fair.internalID": (v5/*: any*/),
        "fair.name": (v4/*: any*/),
        "fair.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fair.profile.id": (v5/*: any*/),
        "fair.profile.initials": (v4/*: any*/),
        "fair.profile.internalID": (v5/*: any*/),
        "fair.startAt": (v4/*: any*/)
      }
    },
    "name": "EntityHeaderFairFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query EntityHeaderFairFragmentContainer_Test_Query {\n  fair(id: \"example\") {\n    ...EntityHeaderFair_fair\n    id\n  }\n}\n\nfragment EntityHeaderFair_fair on Fair {\n  internalID\n  href\n  name\n  startAt(format: \"MMM Do\")\n  endAt(format: \"MMM Do YYYY\")\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  profile {\n    internalID\n    initials\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "62371785af84d702486a3c6cca12d32c";

export default node;
