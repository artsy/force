/**
 * @generated SignedSource<<cd87fdc06ad0078d353eef4fb1c3ffac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerFollowButtonTestQuery$variables = {
  id: string;
};
export type FairOrganizerFollowButtonTestQuery$data = {
  readonly fairOrganizer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerFollowButton_fairOrganizer">;
  } | null | undefined;
};
export type FairOrganizerFollowButtonTestQuery = {
  response: FairOrganizerFollowButtonTestQuery$data;
  variables: FairOrganizerFollowButtonTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOrganizerFollowButtonTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerFollowButton_fairOrganizer"
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
    "name": "FairOrganizerFollowButtonTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5bea48e7847fade87742afb9f69a305d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fairOrganizer.id": (v3/*: any*/),
        "fairOrganizer.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "fairOrganizer.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fairOrganizer.profile.id": (v3/*: any*/),
        "fairOrganizer.profile.internalID": (v3/*: any*/),
        "fairOrganizer.profile.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "fairOrganizer.slug": (v3/*: any*/)
      }
    },
    "name": "FairOrganizerFollowButtonTestQuery",
    "operationKind": "query",
    "text": "query FairOrganizerFollowButtonTestQuery(\n  $id: String!\n) {\n  fairOrganizer(id: $id) {\n    ...FairOrganizerFollowButton_fairOrganizer\n    id\n  }\n}\n\nfragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    id\n    internalID\n    isFollowed\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f27fe2df645e5aefa76e4acddc79a29";

export default node;
